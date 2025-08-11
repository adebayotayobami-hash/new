import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Plane, 
  DollarSign, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useAuthenticatedFetch } from "../hooks/useAuth";
import { Booking, SupportTicket } from "@shared/api";

interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  pendingTickets: number;
  recentBookings: Booking[];
  urgentTickets: SupportTicket[];
}

interface AdminTabProps {
  authenticatedFetch: any;
  stats: AdminStats | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const authenticatedFetch = useAuthenticatedFetch();
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "payments" | "support">("overview");

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      // Fetch admin statistics - in production, this would be a dedicated admin API
      const [bookingsRes, supportRes] = await Promise.all([
        authenticatedFetch('/api/admin/bookings'),
        authenticatedFetch('/api/admin/support/stats')
      ]);

      if (bookingsRes.ok && supportRes.ok) {
        const bookingsData = await bookingsRes.json();
        const supportData = await supportRes.json();

        const mockStats: AdminStats = {
          totalBookings: bookingsData.total || 156,
          totalRevenue: 1560, // Mock revenue
          activeUsers: 89, // Mock active users
          pendingTickets: supportData.byStatus?.open || 12,
          recentBookings: bookingsData.bookings?.slice(0, 5) || [],
          urgentTickets: [] // Mock urgent tickets
        };

        setStats(mockStats);
      } else {
        setError("Failed to load admin data");
      }
    } catch (err) {
      setError("An error occurred while loading admin data");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#E7E9FF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#637996] mb-4">Please log in to access the admin dashboard</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#3839C9] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E7E9FF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3839C9] mx-auto mb-4"></div>
          <p className="text-[#637996]">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E7E9FF] font-jakarta">
      {/* Header */}
      <header className="container mx-auto px-4 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}> 
            <img
              src="/onboard/result.png"
              alt="OnboardTicket Logo"
              className="h-14 md:h-24 w-auto max-w-[220px] md:max-w-[320px] object-contain cursor-pointer"
              loading="eager"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#637996]">
              Welcome, {user.firstName} (Admin)
            </span>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 bg-[#3839C9] text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              User Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-12 py-8">
        {/* Page Header */}
        <div className="bg-white/60 backdrop-blur-md rounded-[24px] p-8 md:p-12 shadow-xl border border-[#E7E9FF] mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#3839C9] mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-[#637996]">
            Manage bookings, users, and support tickets
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/80 rounded-2xl p-2 shadow-lg mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "overview", label: "Overview", icon: TrendingUp },
              { key: "bookings", label: "Bookings", icon: Plane },
              { key: "payments", label: "Payments", icon: DollarSign },
              { key: "support", label: "Support", icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#3839C9] text-white"
                    : "text-[#637996] hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#637996] text-sm font-semibold">Total Bookings</p>
                    <p className="text-3xl font-bold text-[#20242A]">{stats.totalBookings}</p>
                    <p className="text-green-600 text-sm">+12% this month</p>
                  </div>
                  <Plane className="w-10 h-10 text-[#3839C9]" />
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#637996] text-sm font-semibold">Total Revenue</p>
                    <p className="text-3xl font-bold text-[#20242A]">${stats.totalRevenue}</p>
                    <p className="text-green-600 text-sm">+8% this month</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-[#3839C9]" />
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#637996] text-sm font-semibold">Active Users</p>
                    <p className="text-3xl font-bold text-[#20242A]">{stats.activeUsers}</p>
                    <p className="text-green-600 text-sm">+15% this month</p>
                  </div>
                  <Users className="w-10 h-10 text-[#3839C9]" />
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#637996] text-sm font-semibold">Pending Tickets</p>
                    <p className="text-3xl font-bold text-[#20242A]">{stats.pendingTickets}</p>
                    <p className="text-yellow-600 text-sm">Needs attention</p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-[#3839C9]" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#20242A]">Recent Bookings</h2>
                  <button 
                    onClick={() => setActiveTab("bookings")}
                    className="text-[#3839C9] hover:text-blue-700 font-semibold"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {stats.recentBookings.length > 0 ? (
                    stats.recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{booking.pnr}</p>
                          <p className="text-sm text-[#637996]">
                            {booking.route.from.city} → {booking.route.to.city}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${booking.totalAmount}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#637996] text-center py-4">No recent bookings</p>
                  )}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[#20242A] mb-6">System Status</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Payment System</span>
                    </div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Booking Engine</span>
                    </div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Email Delivery</span>
                    </div>
                    <span className="text-yellow-600 text-sm">Delayed</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Support System</span>
                    </div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <AdminBookingsTab
            authenticatedFetch={authenticatedFetch}
            stats={stats}
          />
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <AdminPaymentsTab
            authenticatedFetch={authenticatedFetch}
            stats={stats}
          />
        )}

        {/* Support Tab */}
        {activeTab === "support" && (
          <AdminSupportTab
            authenticatedFetch={authenticatedFetch}
            stats={stats}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {/* Logo and Copyright */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-start">
              <img
                src="/onboard/logos-01.png"
                alt="OnboardTicket Footer Logo"
                className="h-14 md:h-24 w-auto max-w-[220px] md:max-w-[320px] object-contain cursor-pointer"
                loading="lazy"
                onClick={() => navigate("/")}
              />
              <hr className="border-black w-32 sm:w-40 md:w-72" />
              <h4 className="font-semibold text-black text-xs sm:text-sm md:text-base">
                Onboardticket.com
              </h4>
              <p className="text-[10px] sm:text-xs font-semibold text-[#303850] opacity-50">
                © 2025 — Copyright
              </p>
            </div>
            {/* About */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">About</h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-[#A2A2A2]">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/about")}>Who We are ?</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/terms-conditions")}>Terms & Conditions</li>
              </ul>
            </div>
            {/* Get Help */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">Get Help</h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-[#A2A2A2]">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/faq")}>FAQs</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/contact")}>Contact Support 24/7</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">Follow US</h4>
              <div className="space-y-1 md:space-y-2">
                <h5 className="text-base md:text-lg font-bold text-[#0D69F2]">Stay in touch</h5>
                <p className="text-xs sm:text-sm font-semibold text-[#A2A2A2]">Blog</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Admin Bookings Tab Component
function AdminBookingsTab({ authenticatedFetch, stats }: AdminTabProps) {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllBookings();
  }, [currentPage, statusFilter]);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await authenticatedFetch(`/api/admin/bookings?page=${currentPage}&status=${statusFilter}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setAllBookings(data.bookings || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await authenticatedFetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchAllBookings(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = allBookings.filter(booking =>
        booking.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.route.from.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.route.to.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(allBookings);
    }
  }, [searchTerm, allBookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white/80 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#20242A]">All Bookings</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3839C9] mx-auto mb-4"></div>
            <p className="text-[#637996]">Loading bookings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.pnr}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.route.from.code} → {booking.route.to.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.passengers.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${booking.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 ml-2"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Payments Tab Component
function AdminPaymentsTab({ authenticatedFetch, stats }: AdminTabProps) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await authenticatedFetch('/api/admin/payments');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const processRefund = async (transactionId: string) => {
    try {
      const response = await authenticatedFetch(`/api/admin/payments/${transactionId}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        fetchTransactions(); // Refresh data
      }
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    searchTerm === "" ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.bookingId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      case "refunded": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Total Revenue</p>
              <p className="text-3xl font-bold text-[#20242A]">${stats?.totalRevenue || 0}</p>
            </div>
            <DollarSign className="w-10 h-10 text-[#3839C9]" />
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Transactions</p>
              <p className="text-3xl font-bold text-[#20242A]">{transactions.length}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-[#3839C9]" />
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Avg. Transaction</p>
              <p className="text-3xl font-bold text-[#20242A]">
                ${transactions.length > 0 ? ((stats?.totalRevenue || 0) / transactions.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-[#3839C9]" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/80 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#20242A]">All Transactions</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3839C9] mx-auto mb-4"></div>
            <p className="text-[#637996]">Loading transactions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transaction.status === 'completed' && (
                        <button
                          onClick={() => processRefund(transaction.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Admin Support Tab Component
function AdminSupportTab({ authenticatedFetch, stats }: AdminTabProps) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await authenticatedFetch('/api/admin/support/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || []);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string, response?: string) => {
    try {
      const payload: any = { status };
      if (response) payload.response = response;

      const res = await authenticatedFetch(`/api/admin/support/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchTickets(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === "" ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-700";
      case "in_progress": return "bg-yellow-100 text-yellow-700";
      case "resolved": return "bg-green-100 text-green-700";
      case "closed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-700";
      case "high": return "bg-orange-100 text-orange-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Total Tickets</p>
              <p className="text-3xl font-bold text-[#20242A]">{tickets.length}</p>
            </div>
            <MessageSquare className="w-10 h-10 text-[#3839C9]" />
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Open</p>
              <p className="text-3xl font-bold text-[#20242A]">
                {tickets.filter(t => t.status === 'open').length}
              </p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">In Progress</p>
              <p className="text-3xl font-bold text-[#20242A]">
                {tickets.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#637996] text-sm font-semibold">Resolved</p>
              <p className="text-3xl font-bold text-[#20242A]">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3839C9]"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white/80 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#20242A]">Support Tickets</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3839C9] mx-auto mb-4"></div>
            <p className="text-[#637996]">Loading tickets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {ticket.status === 'open' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Start
                          </button>
                        )}
                        {ticket.status === 'in_progress' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Resolve
                          </button>
                        )}
                        {ticket.status !== 'closed' && (
                          <button
                            onClick={() => updateTicketStatus(ticket.id, 'closed')}
                            className="text-gray-600 hover:text-gray-900 ml-2"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
