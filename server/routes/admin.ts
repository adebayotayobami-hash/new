import { RequestHandler } from "express";
import { getAllBookings } from "./user";

// Mock users for admin management
const users = [
  {
    id: "1",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    title: "Mr",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z"
  },
  {
    id: "2",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    title: "Ms",
    status: "active",
    createdAt: "2025-01-12T14:30:00Z",
    updatedAt: "2025-01-12T14:30:00Z"
  }
];

// Get comprehensive admin statistics
export const handleGetAdminStats: RequestHandler = (req, res) => {
  try {
    const bookings = getAllBookings();
    
    // Calculate stats
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const activeUsers = users.filter(u => u.status === 'active').length;
    
    // Booking status breakdown
    const bookingsByStatus = {
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      expired: bookings.filter(b => b.status === 'expired').length
    };
    
    // Revenue by month (simplified)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = bookings
      .filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
      })
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
    
    // Top routes
    const routeCounts: { [key: string]: number } = {};
    bookings.forEach(booking => {
      const routeKey = `${booking.route.from.code}-${booking.route.to.code}`;
      routeCounts[routeKey] = (routeCounts[routeKey] || 0) + 1;
    });
    
    const topRoutes = Object.entries(routeCounts)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Recent activity
    const recentBookings = bookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    const stats = {
      totalBookings,
      totalRevenue,
      activeUsers,
      bookingsByStatus,
      monthlyRevenue,
      topRoutes,
      recentBookings,
      averageBookingValue: totalBookings > 0 ? (totalRevenue / totalBookings) : 0,
      conversionRate: 85.5, // Mock conversion rate
      customerSatisfaction: 4.7 // Mock rating
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all users (admin only)
export const handleGetAllUsers: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    let filteredUsers = users;
    
    // Filter by status
    if (status && status !== 'all') {
      filteredUsers = users.filter(user => user.status === status);
    }
    
    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(startIndex, endIndex);

    // Add booking stats for each user
    const bookings = getAllBookings();
    const usersWithStats = paginatedUsers.map(user => {
      const userBookings = bookings.filter(b => b.userId === user.id);
      return {
        ...user,
        totalBookings: userBookings.length,
        totalSpent: userBookings.reduce((sum, b) => sum + b.totalAmount, 0),
        lastBooking: userBookings.length > 0 ? 
          userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt : 
          null
      };
    });

    res.json({
      users: usersWithStats,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit)
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update user status (admin only)
export const handleUpdateUserStatus: RequestHandler = (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['active', 'suspended', 'banned'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    users[userIndex] = {
      ...users[userIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, user: users[userIndex] });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Export all users for other modules to access if needed
export const getAllUsers = () => users;
