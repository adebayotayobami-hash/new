# OnboardTicket Integrations Setup Guide

This document provides setup instructions for the three main integrations: Stripe, SendGrid, and Amadeus.

## 🔧 Environment Variables Required

The following environment variables need to be configured in your deployment environment and Supabase edge function secrets:

### Stripe Integration
```bash
# Server environment variables
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_...  # or pk_live_... for production

# Supabase edge function secret
STRIPE_WEBHOOK_SECRET=whsec_...
```

### SendGrid Integration
```bash
# Server environment variables  
SENDGRID_API_KEY=SG....

# Supabase edge function secret (same key)
SENDGRID_API_KEY=SG....
```

### Amadeus Integration
```bash
# Server environment variables
AMADEUS_API_KEY=your_amadeus_client_id
AMADEUS_API_SECRET=your_amadeus_client_secret

# Supabase edge function secrets (same keys)
AMADEUS_API_KEY=your_amadeus_client_id  
AMADEUS_API_SECRET=your_amadeus_client_secret
```

## 💳 Stripe Payment Integration

### Features Implemented
- Payment Intent creation and confirmation
- Secure payment processing with 3D Secure support
- Webhook handling for payment events
- Refund processing
- Multiple payment methods support

### API Endpoints
- `POST /api/payments/stripe/create-intent` - Create payment intent
- `GET /api/payments/stripe/config` - Get publishable key
- `POST /api/payments` - Process payments (supports Stripe method)

### Supabase Edge Function
- **Function**: `stripe-webhook`
- **Purpose**: Handle Stripe webhook events securely
- **Events Supported**:
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed` 
  - `payment_intent.requires_action`

### Setup Steps
1. Create Stripe account at https://stripe.com
2. Get API keys from Stripe Dashboard
3. Configure webhook endpoint in Stripe Dashboard:
   - URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.requires_action`
4. Add environment variables to your deployment
5. Add webhook secret to Supabase edge function secrets

### Usage Example
```typescript
// Create payment intent
const response = await fetch('/api/payments/stripe/create-intent', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bookingId: 'booking_123',
    amount: 299.99,
    currency: 'USD'
  })
});

const { clientSecret } = await response.json();
// Use clientSecret with Stripe.js on frontend
```

## 📧 SendGrid Email Service

### Features Implemented
- Booking confirmation emails
- Payment confirmation emails
- Support ticket notifications
- Password reset emails
- Welcome emails for new users
- Custom HTML email templates

### API Endpoints
- `POST /api/email/booking-confirmation` - Send booking confirmation
- `POST /api/email/payment-confirmation` - Send payment confirmation
- `POST /api/email/support-ticket-confirmation` - Send support ticket confirmation
- `POST /api/email/password-reset` - Send password reset
- `POST /api/email/welcome` - Send welcome email
- `POST /api/email/test` - Send test email

### Supabase Edge Function
- **Function**: `sendgrid-email`
- **Purpose**: Send emails securely without exposing API keys to client
- **Features**: Email logging, template support, error handling

### Setup Steps
1. Create SendGrid account at https://sendgrid.com
2. Verify sender identity for `email-services@onboardticket.com`
3. Create API key with Mail Send permissions
4. Add API key to environment variables and Supabase secrets
5. Optional: Create custom email templates in SendGrid dashboard

### Usage Example
```typescript
// Send booking confirmation
const response = await fetch('/api/email/booking-confirmation', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'customer@example.com',
    bookingData: {
      customerName: 'John Doe',
      pnr: 'ABC123',
      route: {
        from: 'JFK',
        to: 'LAX', 
        departureDate: '2024-01-15'
      },
      passengers: [...],
      totalAmount: 299.99,
      currency: 'USD',
      bookingUrl: 'https://app.com/booking/ABC123'
    }
  })
});
```

## ✈️ Amadeus Flight Data Integration

### Features Implemented
- Flight search and pricing
- Airport and city search
- Airline information lookup
- Popular destinations
- Seat map retrieval
- Flight offer pricing confirmation

### API Endpoints
- `GET /api/amadeus/flights/search` - Search flight offers
- `GET /api/amadeus/airports/search` - Search airports and cities
- `POST /api/amadeus/flights/price` - Get detailed flight pricing
- `GET /api/amadeus/flights/seat-maps` - Get seat maps
- `GET /api/amadeus/airlines/:code` - Get airline information
- `GET /api/amadeus/destinations/popular` - Get popular destinations
- `GET /api/amadeus/health` - Health check

### Supabase Edge Function
- **Function**: `amadeus-proxy`
- **Purpose**: Proxy Amadeus API requests securely
- **Features**: Token management, request validation, error handling

### Setup Steps
1. Create Amadeus for Developers account at https://developers.amadeus.com
2. Create new application to get API key and secret
3. Choose environment (test for development, production for live)
4. Add credentials to environment variables and Supabase secrets
5. Test connection with health check endpoint

### Usage Example
```typescript
// Search flights
const params = new URLSearchParams({
  originLocationCode: 'JFK',
  destinationLocationCode: 'LAX',
  departureDate: '2024-01-15',
  adults: '2',
  currencyCode: 'USD',
  max: '10'
});

const response = await fetch(`/api/amadeus/flights/search?${params}`);
const { data: flightOffers } = await response.json();

// Search airports
const airportParams = new URLSearchParams({
  keyword: 'New York',
  subType: 'AIRPORT'
});

const airportResponse = await fetch(`/api/amadeus/airports/search?${airportParams}`);
const { data: airports } = await airportResponse.json();
```

## 🚀 Deployment Configuration

### Supabase Edge Functions Deployment
```bash
# Deploy all edge functions
supabase functions deploy stripe-webhook
supabase functions deploy sendgrid-email  
supabase functions deploy amadeus-proxy

# Set secrets
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set SENDGRID_API_KEY=SG....
supabase secrets set AMADEUS_API_KEY=your_client_id
supabase secrets set AMADEUS_API_SECRET=your_client_secret
```

### Production Environment Variables
Add these to your production deployment (Netlify, Vercel, etc.):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# SendGrid  
SENDGRID_API_KEY=SG....

# Amadeus
AMADEUS_API_KEY=your_amadeus_client_id
AMADEUS_API_SECRET=your_amadeus_client_secret

# Environment
NODE_ENV=production
CLIENT_URL=https://your-production-domain.com
```

## 🧪 Testing

### Testing Stripe
1. Use test mode API keys
2. Use test card numbers from Stripe documentation
3. Test webhook events using Stripe CLI
4. Verify payment flows end-to-end

### Testing SendGrid
1. Use `/api/email/test` endpoint
2. Verify sender identity in SendGrid
3. Check email delivery in SendGrid dashboard
4. Test different email templates

### Testing Amadeus
1. Use test environment for development
2. Use `/api/amadeus/health` for connectivity test
3. Test with real IATA airport codes
4. Verify API quota usage in Amadeus dashboard

## 🔒 Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables for all secrets
- Rotate keys regularly
- Use different keys for development/production

### Webhooks
- Always verify webhook signatures
- Use HTTPS endpoints only
- Implement idempotency for webhook handlers
- Log webhook events for debugging

### Rate Limiting
- Implement rate limiting for public endpoints
- Monitor API usage quotas
- Cache frequently requested data
- Use pagination for large result sets

## 📊 Monitoring and Logging

### Recommended Monitoring
- Payment success/failure rates
- Email delivery rates  
- API response times
- Error rates and types
- Webhook delivery success

### Log Analysis
- Failed payment attempts
- Email bounce rates
- API quota usage
- Performance bottlenecks
- Security events

## 🆘 Troubleshooting

### Common Issues
1. **Stripe payments failing**: Check API keys, webhook configuration, and network connectivity
2. **Emails not sending**: Verify SendGrid API key, sender verification, and template IDs
3. **Flight search not working**: Check Amadeus credentials, API quotas, and endpoint URLs
4. **Webhook not receiving events**: Verify endpoint URLs, HTTPS configuration, and signature validation

### Debug Steps
1. Check environment variables are set correctly
2. Verify API credentials in respective dashboards
3. Test endpoints individually using health checks
4. Review application logs for detailed error messages
5. Check third-party service status pages

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Amadeus for Developers](https://developers.amadeus.com/documentation)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
