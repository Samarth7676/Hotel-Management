import { useState, useEffect } from 'react';
import { Calendar, User, CreditCard, Clock, CheckCircle, XCircle, Search, Filter, ArrowUpRight, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';
import { bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

// EMERGENCY BYPASS: Define dummy data outside the component so it remembers changes!
const getInitialBookings = () => {
  const saved = localStorage.getItem('dummyBookings_v2'); // Changed to v2 to bypass old cache
  if (saved) return JSON.parse(saved);
  return [
    { id: 101, user: { fullName: 'John Doe' }, room: { roomNumber: '201' }, checkInDate: '2026-05-01', checkOutDate: '2026-05-05', totalPrice: 340.00, status: 'CONFIRMED' },
    { id: 102, user: { fullName: 'Alice Smith' }, room: { roomNumber: '301' }, checkInDate: '2026-05-10', checkOutDate: '2026-05-12', totalPrice: 300.00, status: 'CHECKED_IN' },
    { id: 103, user: { fullName: 'Bob Johnson' }, room: { roomNumber: '101' }, checkInDate: '2026-04-20', checkOutDate: '2026-04-22', totalPrice: 100.00, status: 'CHECKED_OUT' },
  ];
};
let globalDummyBookings = getInitialBookings();

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      // EMERGENCY BYPASS: Use dummy data
      setBookings([...globalDummyBookings]);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
    setCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return;

    // EMERGENCY BYPASS: Fake successful cancellation
    globalDummyBookings = globalDummyBookings.map(b => b.id === bookingToCancel ? { ...b, status: 'CANCELLED' } : b);
    localStorage.setItem('dummyBookings_v2', JSON.stringify(globalDummyBookings));
    setBookings([...globalDummyBookings]);
    setCancelModalOpen(false);
    setBookingToCancel(null);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setBookingToCancel(null);
  };

  const statusColors = {
    PENDING: 'text-amber-600 bg-amber-50 border-amber-100',
    CONFIRMED: 'text-primary-600 bg-primary-50 border-primary-100',
    CHECKED_IN: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    CHECKED_OUT: 'text-slate-500 bg-slate-50 border-slate-100',
    CANCELLED: 'text-red-600 bg-red-50 border-red-100',
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Booking History</h2>
            <p className="text-slate-500 mt-1">Manage and track all hotel room reservations</p>
          </div>
          <Link to="/rooms" className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg">
            <Calendar className="w-5 h-5" />
            <span>New Reservation</span>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by customer name or booking ID..." 
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-slate-900"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
              <CreditCard className="w-4 h-4" />
              <span>Payments</span>
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check-In</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check-Out</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.map((booking) => (
                  <motion.tr 
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">#{booking.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                          {booking.user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{booking.user?.fullName || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600">Room {booking.room?.roomNumber || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{booking.checkInDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{booking.checkOutDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary-600">${booking.totalPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[booking.status]}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                        {(booking.status === 'PENDING' || booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN') && (
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">Showing {bookings.length} of {bookings.length} bookings</span>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animated Cancel Modal */}
      <AnimatePresence>
        {cancelModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-8 overflow-hidden relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Cancel Booking?</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Are you absolutely sure you want to cancel this reservation? This action cannot be undone.
                </p>
                <div className="flex w-full space-x-4">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 py-3.5 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={confirmCancelBooking}
                    className="flex-1 py-3.5 px-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Bookings;
