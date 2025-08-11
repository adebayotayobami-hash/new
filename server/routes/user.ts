import { RequestHandler } from "express";
import { UserDashboardData, Booking } from "@shared/api";

// Import shared bookings data from bookings route
let bookings: Booking[] = [];

// Initialize with some demo data if no bookings exist
if (bookings.length === 0) {
  const demoBookings: Booking[] = [
    {
      id: "booking_demo_1",
      userId: "1",
      pnr: "ABC123",
      status: "confirmed",
      route: {
        from: { code: "RFD", name: "Chicago Rockford International Airport", city: "Chicago", country: "USA" },
        to: { code: "ORY", name: "Paris Orly Airport", city: "Paris", country: "France" },
        departureDate: "2025-02-15",
        tripType: "oneway"
      },
      passengers: [
        { title: "Mr", firstName: "John", lastName: "Doe", email: "john@example.com" }
      ],
      totalAmount: 15, // Updated to $15 per passenger
      currency: "USD",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      ticketUrl: "/tickets/ABC123.pdf"
    },
    {
      id: "booking_demo_2",
      userId: "1",
      pnr: "XYZ789",
      status: "pending",
      route: {
        from: { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
        to: { code: "LHR", name: "London Heathrow Airport", city: "London", country: "UK" },
        departureDate: "2025-03-20",
        returnDate: "2025-03-25",
        tripType: "roundtrip"
      },
      passengers: [
        { title: "Ms", firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
        { title: "Mr", firstName: "Bob", lastName: "Smith", email: "jane@example.com" }
      ],
      totalAmount: 30, // Updated to $15 per passenger (2 passengers = $30)
      currency: "USD",
      createdAt: "2025-01-20T14:30:00Z",
      updatedAt: "2025-01-20T14:30:00Z"
    }
  ];
  bookings.push(...demoBookings);
}

// Function to get all bookings (shared with booking routes)
export const getAllBookings = () => bookings;

// Function to add booking (shared with booking routes)
export const addBooking = (booking: Booking) => {
  bookings.push(booking);
};

// Get user dashboard data
export const handleGetDashboard: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;

    // Get user's bookings from shared bookings array
    const userBookings = bookings.filter(booking => booking.userId === user.id);

    // Get recent bookings (last 5)
    const recentBookings = userBookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Get upcoming trips
    const now = new Date();
    const upcomingTrips = userBookings
      .filter(booking =>
        booking.status === "confirmed" &&
        new Date(booking.route.departureDate) > now
      )
      .sort((a, b) => new Date(a.route.departureDate).getTime() - new Date(b.route.departureDate).getTime())
      .slice(0, 3);

    const dashboardData: UserDashboardData = {
      user,
      recentBookings,
      totalBookings: userBookings.length,
      upcomingTrips
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get user's bookings
export const handleGetBookings: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;

    // Get user's bookings from shared bookings array
    const userBookings = bookings
      .filter(booking => booking.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(userBookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get specific booking details
export const handleGetBooking: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { bookingId } = req.params;

    const booking = bookings.find(b => b.id === bookingId && b.userId === user.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update user profile
export const handleUpdateProfile: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { firstName, lastName, title } = req.body;
    
    // Validate input
    if (!firstName || !lastName || !title) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // In a real application, update the database
    // For now, we'll just return success
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      title,
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
