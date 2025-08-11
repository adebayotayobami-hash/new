# Supabase Setup Instructions for OnboardTicket

This guide will help you set up Supabase for your OnboardTicket flight reservation application.

## Prerequisites

- Node.js 18+ installed
- Supabase CLI installed (`npm install -g supabase`)
- A Supabase account (free tier is sufficient for development)

## Setup Steps

### 1. Local Development Setup

```bash
# Initialize Supabase in your project
supabase init

# Start local Supabase stack
supabase start
```

This will start:
- PostgreSQL database on `localhost:54322`
- Supabase Studio on `http://localhost:54323`
- API Gateway on `http://localhost:54321`

### 2. Run Migrations

```bash
# Apply the database migrations
supabase db reset

# Or apply migrations manually
supabase db push
```

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your-local-anon-key
```

You can find the anon key by running:
```bash
supabase status
```

### 4. Create Admin User

After running the migrations, create an admin user:

1. Register a user through your app's registration page
2. In Supabase Studio, go to SQL Editor and run:

```sql
SELECT create_admin_user('your-admin-email@example.com');
```

### 5. Production Setup

#### 5.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be ready

#### 5.2 Deploy Migrations

```bash
# Link your local project to remote
supabase link --project-ref your-project-ref

# Push migrations to production
supabase db push
```

#### 5.3 Update Environment Variables

Update your production environment variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## Database Schema Overview

The migration creates the following tables:

### Core Tables
- `users` - User profiles (extends Supabase auth.users)
- `airports` - Airport reference data with IATA codes
- `bookings` - Flight reservation bookings
- `passengers` - Passenger information for bookings
- `transactions` - Payment transactions for bookings
- `support_tickets` - Customer support tickets

### Features Included
- ✅ Row Level Security (RLS) policies
- ✅ Automatic PNR generation
- ✅ Admin dashboard views
- ✅ Audit logging
- ✅ Automatic timestamp updates
- ✅ Data validation triggers
- ✅ Performance indexes

## Key Features

### 1. Authentication & Authorization
- User registration/login via Supabase Auth
- Role-based access control (user/admin)
- Secure RLS policies for data access

### 2. Booking System
- Create flight reservations with passenger details
- Automatic PNR generation (6-character alphanumeric)
- Support for one-way and round-trip bookings
- Booking status management (pending/confirmed/cancelled/expired)

### 3. Payment Processing
- Transaction tracking for bookings
- Support for PayPal and card payments
- Payment status management
- Automatic booking confirmation on payment

### 4. Admin Dashboard
- Real-time statistics view
- User management capabilities
- Booking management and status updates
- Support ticket management
- Revenue analytics

### 5. Support System
- Customer support ticket creation
- Priority and category classification
- Admin response tracking
- Automatic ticket resolution

## Important Functions

### Admin Functions
```sql
-- Create admin user
SELECT create_admin_user('admin@example.com');

-- Check if current user is admin
SELECT is_admin();

-- Get user role
SELECT get_user_role();

-- Cleanup expired bookings
SELECT cleanup_expired_bookings();
```

### Views for Analytics
- `booking_summary` - Complete booking information with airport details
- `admin_dashboard_stats` - Real-time dashboard statistics
- `popular_routes` - Most booked flight routes
- `user_statistics` - User activity and spending data

## Security Features

### Row Level Security
- Users can only access their own data
- Admins have full access to all data
- Public read access to airport reference data

### Data Validation
- Automatic booking validation (dates, airports, amounts)
- Passenger name validation
- Email format validation
- Payment amount validation

### Audit Trail
- All important changes logged in `audit_log` table
- User action tracking
- Admin access logging

## Development Tips

### 1. Seeding Data
The migration includes sample airports. To add more:

```sql
INSERT INTO public.airports (code, name, city, country) VALUES
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'USA');
```

### 2. Testing Payments
For development, use the mock payment system that's already integrated in the app.

### 3. Admin Access
Always test admin functionality with a properly configured admin user:

```sql
-- Check admin status
SELECT 
  email,
  raw_user_meta_data->>'role' as role,
  is_admin() as is_admin_function
FROM auth.users 
WHERE email = 'your-admin@email.com';
```

### 4. Monitoring
Use Supabase Studio to monitor:
- Database performance
- API usage
- Real-time subscriptions
- User authentication

## Troubleshooting

### Common Issues

1. **Migration Fails**
   ```bash
   # Reset database and try again
   supabase db reset
   ```

2. **RLS Policies Not Working**
   - Check if user is properly authenticated
   - Verify user role in `auth.users.raw_user_meta_data`

3. **Admin Functions Not Working**
   - Ensure user has 'admin' role in metadata
   - Check `is_admin()` function returns true

4. **Performance Issues**
   - Ensure indexes are created (they're included in migration)
   - Monitor query performance in Supabase Studio

### Getting Help

- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Community Discord: [discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: Create an issue in your project repository

## Production Checklist

Before deploying to production:

- [ ] All migrations applied successfully
- [ ] Admin user created and tested
- [ ] Environment variables configured
- [ ] RLS policies tested with different user roles
- [ ] Payment system configured (PayPal credentials)
- [ ] Email templates customized
- [ ] Backup strategy in place
- [ ] Monitoring and alerts configured

## API Integration

The app is designed to work seamlessly with the Supabase client. Key integration points:

1. **Authentication**: Uses Supabase Auth with custom user profiles
2. **Data Access**: RLS policies ensure secure data access
3. **Real-time**: Can be extended with Supabase real-time subscriptions
4. **Storage**: Can be extended with Supabase Storage for ticket PDFs
5. **Edge Functions**: PayPal webhook handler included

This setup provides a production-ready foundation for your flight reservation application with proper security, scalability, and admin capabilities.
