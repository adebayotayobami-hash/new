# OnboardTicket Phase 1 Setup Guide 🚀

This guide will help you complete **Phase 1: Core Booking Flow** to make your OnboardTicket app fully functional.

## ✅ **What We've Implemented**

### 1. Database Schema ✅
- Created comprehensive Supabase tables for users, bookings, passengers, payments, and support
- Added Row Level Security (RLS) policies
- Set up proper indexes and relationships

### 2. Flight Search Integration ✅
- Upgraded SearchFlights.tsx with real Amadeus API integration
- Added flight selection interface with detailed flight information
- Implemented fallback to mock data when API is unavailable

### 3. Payment Processing ✅
- Added Stripe payment integration alongside existing PayPal
- Created StripePaymentForm component with secure card processing
- Updated Payment.tsx to handle multiple payment methods

### 4. Environment Configuration ✅
- Created .env.example with all required variables
- Set up proper API key management

## 🔧 **Setup Instructions**

### Step 1: Database Setup

1. **Apply Database Migration**
   ```bash
   # Run the migration to create all necessary tables
   supabase migration up
   
   # Or if using Supabase dashboard, copy and run the SQL from:
   # supabase/migrations/20240101000001_create_core_tables.sql
   ```

2. **Verify Tables Created**
   Check your Supabase dashboard to ensure these tables exist:
   - `users`
   - `bookings` 
   - `passengers`
   - `payment_transactions`
   - `support_tickets`
   - `email_logs`

### Step 2: Environment Variables

1. **Copy Environment Template**
   ```bash
   cp .env.example .env
   ```

2. **Configure Required API Keys**
   
   Edit `.env` file with your actual values:

   **Supabase (Required)**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Stripe (Required for payments)**
   ```env
   STRIPE_SECRET_KEY=sk_test_51...  # Use sk_live_ for production
   STRIPE_PUBLISHABLE_KEY=pk_test_51...  # Use pk_live_ for production
   ```

   **SendGrid (Required for emails)**
   ```env
   SENDGRID_API_KEY=SG.abcd...
   ```

   **Amadeus (Optional - will use mock data if not configured)**
   ```env
   AMADEUS_API_KEY=your_amadeus_client_id
   AMADEUS_API_SECRET=your_amadeus_client_secret
   ```

### Step 3: Supabase Edge Functions Setup

1. **Deploy Edge Functions**
   ```bash
   # Deploy Stripe webhook handler
   supabase functions deploy stripe-webhook

   # Deploy SendGrid email service
   supabase functions deploy sendgrid-email

   # Deploy Amadeus proxy (optional)
   supabase functions deploy amadeus-proxy
   ```

2. **Set Edge Function Secrets**
   ```bash
   # Stripe webhook secret
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...

   # SendGrid API key
   supabase secrets set SENDGRID_API_KEY=SG...

   # Amadeus credentials (optional)
   supabase secrets set AMADEUS_API_KEY=your_client_id
   supabase secrets set AMADEUS_API_SECRET=your_client_secret
   ```

### Step 4: External Service Configuration

#### Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard > Developers > API keys
3. Set up webhook endpoint:
   - URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to environment

#### SendGrid Setup
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify sender identity for `email-services@onboardticket.com`
3. Create API key with Mail Send permissions
4. Add API key to environment

#### Amadeus Setup (Optional)
1. Create account at [developers.amadeus.com](https://developers.amadeus.com)
2. Create new application
3. Get Client ID and Client Secret
4. Choose test environment for development

## 🧪 **Testing Your Setup**

### 1. Test Database Connection
```bash
# Check if tables exist
curl -X GET 'https://your-project.supabase.co/rest/v1/users' \
  -H "apikey: your_anon_key" \
  -H "Authorization: Bearer your_anon_key"
```

### 2. Test Flight Search
1. Go to your app homepage
2. Click "Book Now"
3. Register/login if prompted
4. Fill out route information
5. Verify flight search results appear

### 3. Test Payment Flow
1. Complete flight search
2. Add passenger information
3. Go to payment page
4. Try Stripe payment with test card: `4242 4242 4242 4242`
5. Verify payment success

### 4. Test Email Service
```bash
# Test email endpoint
curl -X POST 'https://your-project.supabase.co/functions/v1/sendgrid-email' \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1><p>This is a test email.</p>"
  }'
```

## 🚀 **Start Your Development Server**

```bash
npm run dev
```

Your app should now be fully functional at http://localhost:8080

## 🔍 **Troubleshooting**

### Common Issues

1. **Flight search not working**
   - Check if Amadeus credentials are correct
   - Verify environment variables are loaded
   - Should fall back to mock data if API fails

2. **Payments failing**
   - Verify Stripe API keys are correct
   - Check webhook is configured properly
   - Use test card numbers for development

3. **Emails not sending**
   - Verify SendGrid API key
   - Check sender identity is verified
   - Review SendGrid dashboard for delivery status

4. **Database errors**
   - Ensure all tables are created
   - Check RLS policies are active
   - Verify user authentication

### Debug Steps

1. **Check server logs**
   ```bash
   # View dev server logs
   npm run dev
   ```

2. **Check browser console**
   - Open browser dev tools
   - Look for API errors in Network tab
   - Check Console for JavaScript errors

3. **Verify API endpoints**
   ```bash
   # Test basic connectivity
   curl http://localhost:8080/api/ping
   
   # Test Amadeus health
   curl http://localhost:8080/api/amadeus/health
   
   # Test Stripe config
   curl http://localhost:8080/api/payments/stripe/config
   ```

## 🎉 **Success Criteria**

Your Phase 1 setup is complete when:

- ✅ Users can register/login
- ✅ Flight search returns real or mock results
- ✅ Users can select flights and add passenger info
- ✅ Payment processing works with Stripe
- ✅ Bookings are saved to database
- ✅ Email confirmations are sent
- ✅ Users can view their bookings in dashboard

## 🔄 **Next Steps - Phase 2**

Once Phase 1 is working, you can move to Phase 2:
- Enhanced user dashboard
- Booking management (cancel, modify)
- Admin panel functionality
- Advanced search filters
- Mobile optimization

## 🆘 **Getting Help**

If you encounter issues:
1. Check this troubleshooting guide
2. Review the INTEGRATIONS_SETUP.md file
3. Check service status pages (Supabase, Stripe, SendGrid, Amadeus)
4. Review application logs for detailed error messages

Your OnboardTicket app should now be ready for real user bookings! 🎉
