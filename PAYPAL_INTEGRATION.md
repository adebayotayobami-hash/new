# PayPal Integration Documentation

## Overview
OnboardTicket now supports PayPal payments alongside credit card processing. The integration includes:

- PayPal order creation and approval flow
- Secure payment capture and verification
- Webhook handling for payment events
- Error handling and user feedback

## Configuration

### Environment Variables
Set the following environment variables for PayPal integration:

```bash

```

### Supabase Edge Function
The PayPal webhook handler is implemented as a Supabase Edge Function:
- Function name: `paypal-webhook`
- Environment variable: `PAYPAL_SIGNATURE` (stored in Supabase secrets)

## Payment Flow

### 1. User Selects PayPal
When a user selects PayPal as payment method:
1. Booking is created with "pending" status
2. PayPal order is created via `/api/payments/paypal/create-order`
3. User is redirected to PayPal for approval

### 2. PayPal Approval
1. User approves payment on PayPal
2. PayPal redirects to `/payment/success?token=ORDER_ID&PayerID=PAYER_ID`
3. Payment is captured via `/api/payments/paypal/capture`
4. Booking status is updated to "confirmed"

### 3. Payment Completion
1. User sees success message
2. Confirmation email is sent
3. Ticket is generated and made available for download

## API Endpoints

### Create PayPal Order
```
POST /api/payments/paypal/create-order
Authorization: Bearer <token>

Body:
{
  "bookingId": "booking_123",
  "amount": 20,
  "currency": "USD"
}

Response:
{
  "success": true,
  "orderID": "paypal_order_id",
  "approvalUrl": "https://paypal.com/approval_url"
}
```

### Capture PayPal Payment
```
POST /api/payments/paypal/capture
Authorization: Bearer <token>

Body:
{
  "orderId": "paypal_order_id",
  "payerId": "payer_id"
}

Response:
{
  "success": true,
  "captureId": "capture_id",
  "status": "COMPLETED"
}
```

## Frontend Integration

### Payment Method Selection
The payment page includes PayPal as a payment option alongside credit cards. The crypto payment option has been removed.

### PayPal Flow
1. User selects PayPal payment method
2. Sees PayPal-branded interface with payment details
3. Clicks "Pay with PayPal" button
4. Redirected to PayPal for approval
5. Returns to success/cancel page based on outcome

## Error Handling

### Common Errors
- **Invalid PayPal credentials**: Check environment variables
- **Order creation failed**: Verify PayPal API access
- **Payment capture failed**: Check order status and payer verification
- **Webhook signature invalid**: Verify PAYPAL_SIGNATURE in Supabase

### User Experience
- Clear error messages for payment failures
- Option to retry payment or contact support
- Booking remains in pending state until payment completion

## Testing

### Sandbox Testing
Use PayPal sandbox credentials for development:
1. Create sandbox business account
2. Generate sandbox API credentials
3. Use sandbox base URL: `https://api-m.sandbox.paypal.com`

### Test Payment Flow
1. Select PayPal payment method
2. Use PayPal sandbox account for payment
3. Verify booking confirmation and status updates

## Security

### Signature Verification
- PayPal webhooks are verified using PAYPAL_SIGNATURE
- Invalid signatures are rejected
- All payment amounts are verified server-side

### Data Protection
- PayPal order IDs and payer IDs are stored securely
- No sensitive PayPal data is logged
- All API communications use HTTPS

## Monitoring

### Webhook Events
Monitor these PayPal webhook events:
- `PAYMENT.CAPTURE.COMPLETED`: Payment successful
- `PAYMENT.CAPTURE.DENIED`: Payment failed
- Additional events can be added as needed

### Logging
All PayPal API interactions are logged for debugging and monitoring purposes.
