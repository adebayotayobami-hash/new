import { RequestHandler } from "express";
import { PaymentRequest, PaymentResponse } from "@shared/api";
import { bookings } from "./bookings";
import { z } from 'zod';
import StripeService from '../lib/stripeService';

// Payment validation schema
const paymentSchema = z.object({
  bookingId: z.string(),
  paymentMethod: z.enum(['card', 'paypal', 'stripe']),
  paymentDetails: z.object({
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardholderName: z.string().optional(),
    country: z.string().optional(),
    paypalOrderId: z.string().optional(),
    paypalPayerId: z.string().optional(),
    stripePaymentIntentId: z.string().optional(),
    stripePaymentMethodId: z.string().optional()
  })
});

// Mock payment transactions storage
const paymentTransactions: Array<{
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}> = [];

let transactionIdCounter = 1;

// Generate transaction ID
const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `txn_${timestamp}_${random}`;
};

// PayPal configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'AeA1QIZXlsOl6reI7QjVAXt3CxbgZMOKe-6xB6RHWyYPUtE9JYOk0-l-uSQnf8BL2S1IZKqHNk1TCO5T';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'demo-client-secret';
const PAYPAL_SIGNATURE = process.env.PAYPAL_SIGNATURE || '';
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
const getPayPalAccessToken = async (): Promise<string> => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

    console.log('Getting PayPal access token...');
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal token request failed:', response.status, errorText);
      throw new Error(`Failed to get PayPal access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('PayPal access token obtained successfully');
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
};

// Verify PayPal payment
const verifyPayPalPayment = async (orderId: string, payerId: string): Promise<boolean> => {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    const order = await response.json();

    // Check if order is approved and payer matches
    return order.status === 'APPROVED' && order.payer?.payer_id === payerId;
  } catch (error) {
    console.error('PayPal verification error:', error);
    return false;
  }
};

// Simulate card validation
const validateCard = (cardNumber: string, expiryDate: string, cvv: string): boolean => {
  // Basic validation - in production, use proper payment processor
  if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) return false;
  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
  if (!cvv || !/^\d{3,4}$/.test(cvv)) return false;
  
  // Check if card is expired
  const [month, year] = expiryDate.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
  if (expiry <= new Date()) return false;
  
  return true;
};

// Process payment
export const handleProcessPayment: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const validation = paymentSchema.safeParse(req.body);
    
    if (!validation.success) {
      const response: PaymentResponse = {
        success: false,
        message: 'Invalid payment data'
      };
      return res.status(400).json(response);
    }

    const { bookingId, paymentMethod, paymentDetails } = validation.data;

    // Find booking
    const bookingIndex = bookings.findIndex(b => b.id === bookingId && b.userId === user.id);
    
    if (bookingIndex === -1) {
      const response: PaymentResponse = {
        success: false,
        message: 'Booking not found'
      };
      return res.status(404).json(response);
    }

    const booking = bookings[bookingIndex];

    if (booking.status !== 'pending') {
      const response: PaymentResponse = {
        success: false,
        message: 'Booking is not eligible for payment'
      };
      return res.status(400).json(response);
    }

    // Validate payment method specific details
    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv, cardholderName, country } = paymentDetails;

      if (!cardNumber || !expiryDate || !cvv || !cardholderName || !country) {
        const response: PaymentResponse = {
          success: false,
          message: 'Missing required card details'
        };
        return res.status(400).json(response);
      }

      if (!validateCard(cardNumber, expiryDate, cvv)) {
        const response: PaymentResponse = {
          success: false,
          message: 'Invalid card details'
        };
        return res.status(400).json(response);
      }
    } else if (paymentMethod === 'stripe') {
      const { stripePaymentIntentId, stripePaymentMethodId } = paymentDetails;

      if (!stripePaymentIntentId) {
        const response: PaymentResponse = {
          success: false,
          message: 'Missing Stripe payment intent ID'
        };
        return res.status(400).json(response);
      }

      // Verify Stripe payment intent
      try {
        const paymentIntent = await StripeService.retrievePaymentIntent(stripePaymentIntentId);

        if (paymentIntent.status !== 'succeeded' && paymentIntent.status !== 'requires_action') {
          const response: PaymentResponse = {
            success: false,
            message: 'Stripe payment not completed'
          };
          return res.status(400).json(response);
        }

        // If payment requires confirmation
        if (paymentIntent.status === 'requires_confirmation') {
          await StripeService.confirmPaymentIntent(stripePaymentIntentId, stripePaymentMethodId);
        }
      } catch (error) {
        console.error('Stripe payment verification failed:', error);
        const response: PaymentResponse = {
          success: false,
          message: 'Stripe payment verification failed'
        };
        return res.status(400).json(response);
      }
    } else if (paymentMethod === 'paypal') {
      const { paypalOrderId, paypalPayerId } = paymentDetails;

      if (!paypalOrderId || !paypalPayerId) {
        const response: PaymentResponse = {
          success: false,
          message: 'Missing PayPal payment details'
        };
        return res.status(400).json(response);
      }

      // Verify PayPal payment with PayPal API
      const paypalVerified = await verifyPayPalPayment(paypalOrderId, paypalPayerId);
      if (!paypalVerified) {
        const response: PaymentResponse = {
          success: false,
          message: 'PayPal payment verification failed'
        };
        return res.status(400).json(response);
      }
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate payment success/failure (95% success rate for demo)
    const paymentSuccess = Math.random() > 0.05;

    if (!paymentSuccess) {
      // Create failed transaction record
      const failedTransaction = {
        id: `transaction_${transactionIdCounter}`,
        bookingId,
        userId: user.id,
        amount: booking.totalAmount,
        currency: booking.currency,
        method: paymentMethod,
        status: 'failed' as const,
        transactionId: generateTransactionId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      paymentTransactions.push(failedTransaction);
      transactionIdCounter++;

      const response: PaymentResponse = {
        success: false,
        message: 'Payment failed. Please check your payment details and try again.'
      };
      return res.status(400).json(response);
    }

    // Create successful transaction record
    const transaction = {
      id: `transaction_${transactionIdCounter}`,
      bookingId,
      userId: user.id,
      amount: booking.totalAmount,
      currency: booking.currency,
      method: paymentMethod,
      status: 'completed' as const,
      transactionId: generateTransactionId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    paymentTransactions.push(transaction);
    transactionIdCounter++;

    // Update booking status to confirmed
    bookings[bookingIndex] = {
      ...booking,
      status: 'confirmed',
      ticketUrl: `/tickets/${booking.pnr}.pdf`,
      updatedAt: new Date().toISOString()
    };

    const response: PaymentResponse = {
      success: true,
      transactionId: transaction.transactionId,
      message: 'Payment processed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Payment processing error:', error);
    const response: PaymentResponse = {
      success: false,
      message: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

// Get payment history
export const handleGetPaymentHistory: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    
    const userTransactions = paymentTransactions
      .filter(transaction => transaction.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(userTransactions);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get specific transaction
export const handleGetTransaction: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { transactionId } = req.params;
    
    const transaction = paymentTransactions.find(t => 
      t.transactionId === transactionId && t.userId === user.id
    );
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Refund payment (admin only)
export const handleRefundPayment: RequestHandler = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { reason } = req.body;
    
    const transactionIndex = paymentTransactions.findIndex(t => t.transactionId === transactionId);
    
    if (transactionIndex === -1) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const transaction = paymentTransactions[transactionIndex];
    
    if (transaction.status !== 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only completed transactions can be refunded' 
      });
    }

    // Simulate refund processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update transaction status
    paymentTransactions[transactionIndex] = {
      ...transaction,
      status: 'refunded',
      updatedAt: new Date().toISOString()
    };

    // Update booking status
    const bookingIndex = bookings.findIndex(b => b.id === transaction.bookingId);
    if (bookingIndex !== -1) {
      bookings[bookingIndex] = {
        ...bookings[bookingIndex],
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      };
    }

    res.json({ 
      success: true, 
      message: 'Refund processed successfully',
      transaction: paymentTransactions[transactionIndex]
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Create PayPal order
export const handleCreatePayPalOrder: RequestHandler = async (req, res) => {
  try {
    const { bookingId, amount, currency = 'USD' } = req.body;

    if (!bookingId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    console.log('Creating PayPal order for booking:', bookingId, 'amount:', amount);

    // For development/demo mode, return a mock response if PayPal credentials are not configured
    if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === 'demo-client-id') {
      console.log('PayPal demo mode - returning mock approval URL');
      return res.json({
        success: true,
        orderID: `mock_order_${Date.now()}`,
        approvalUrl: `${req.headers.origin}/payment/success?token=mock_order_${Date.now()}&PayerID=mock_payer`
      });
    }

    const accessToken = await getPayPalAccessToken();

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: bookingId,
        amount: {
          currency_code: currency,
          value: amount.toString()
        },
        description: `OnboardTicket Flight Reservation - ${bookingId}`
      }],
      application_context: {
        brand_name: 'OnboardTicket',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${req.headers.origin}/payment/success`,
        cancel_url: `${req.headers.origin}/payment/cancel`
      }
    };

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create PayPal order');
    }

    const order = await response.json();
    const approvalUrl = order.links.find((link: any) => link.rel === 'approve')?.href;

    res.json({
      success: true,
      orderID: order.id,
      approvalUrl
    });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create PayPal order'
    });
  }
};

// Capture PayPal payment
export const handleCapturePayPalPayment: RequestHandler = async (req, res) => {
  try {
    const { orderId, payerId } = req.body;

    if (!orderId || !payerId) {
      return res.status(400).json({
        success: false,
        message: 'Missing order ID or payer ID'
      });
    }

    console.log('Capturing PayPal payment for order:', orderId, 'payer:', payerId);

    // Handle mock orders for development
    if (orderId.startsWith('mock_order_') || payerId === 'mock_payer') {
      console.log('PayPal demo mode - returning mock capture response');
      return res.json({
        success: true,
        captureId: `mock_capture_${Date.now()}`,
        status: 'COMPLETED'
      });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to capture PayPal payment');
    }

    const capture = await response.json();

    res.json({
      success: true,
      captureId: capture.id,
      status: capture.status
    });
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to capture PayPal payment'
    });
  }
};

// Create Stripe Payment Intent
export const handleCreateStripePaymentIntent: RequestHandler = async (req, res) => {
  try {
    const user = (req as any).user;
    const { bookingId, amount, currency = 'USD' } = req.body;

    if (!bookingId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find booking
    const booking = bookings.find(b => b.id === bookingId && b.userId === user.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Booking is not eligible for payment'
      });
    }

    console.log('Creating Stripe payment intent for booking:', bookingId, 'amount:', amount);

    const paymentIntent = await StripeService.createPaymentIntent({
      amount,
      currency,
      bookingId,
      customerEmail: user.email,
      description: `OnboardTicket Flight Reservation - ${booking.pnr}`
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Stripe payment intent'
    });
  }
};

// Get Stripe publishable key
export const handleGetStripeConfig: RequestHandler = (req, res) => {
  try {
    res.json({
      publishableKey: StripeService.getPublishableKey()
    });
  } catch (error) {
    console.error('Get Stripe config error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get Stripe configuration'
    });
  }
};

// Get all transactions (admin only)
export const handleGetAllTransactions: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    let filteredTransactions = paymentTransactions;

    if (status && status !== 'all') {
      filteredTransactions = paymentTransactions.filter(transaction => transaction.status === status);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTransactions = filteredTransactions
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(startIndex, endIndex);

    res.json({
      transactions: paginatedTransactions,
      total: filteredTransactions.length,
      page,
      limit,
      totalPages: Math.ceil(filteredTransactions.length / limit)
    });
  } catch (error) {
    console.error('Get all transactions error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
