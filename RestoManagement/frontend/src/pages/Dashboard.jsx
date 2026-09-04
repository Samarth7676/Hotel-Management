import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Users, BedDouble, UtensilsCrossed, TrendingUp, 
  CheckCircle, Clock, AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

import { Link } from 'react-router-dom';
import { dashboardApi, orderApi, bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // EMERGENCY BYPASS: Use dummy data
        if (user?.role === 'ADMIN') {
          setStats({ totalRevenue: 24500, totalBookings: 128, availableRooms: 15, pendingOrders: 8 });
        } else {
          setMyBookings([
            { id: 101, room: { roomNumber: '201' }, checkInDate: '2026-05-01', checkOutDate: '2026-05-05', status: 'CONFIRMED' }
          ]);
          setMyOrders([
            { id: 501, totalAmount: 45.98, orderType: 'DINE_IN', status: 'PENDING' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (user?.role !== 'ADMIN') {
    return (
      <Layout>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome, {user?.username}</h2>
            <p className="text-slate-500 mt-1">Manage your bookings and orders here.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <BedDouble className="w-5 h-5 mr-2 text-primary-600" />
                My Recent Bookings
              </h3>
              {myBookings.length > 0 ? (
                <div className="space-y-4">
                  {myBookings.slice(0, 3).map(b => (
                    <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-900">Room {b.room?.roomNumber}</p>
                        <p className="text-xs text-slate-500">{b.checkInDate} to {b.checkOutDate}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-primary-100 text-primary-600 rounded-lg">{b.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">No bookings found. <Link to="/rooms" className="text-primary-600 font-bold hover:underline">Book now</Link></p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <UtensilsCrossed className="w-5 h-5 mr-2 text-primary-600" />
                My Recent Orders
              </h3>
              {myOrders.length > 0 ? (
                <div className="space-y-4">
                  {myOrders.slice(0, 3).map(o => (
                    <div key={o.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-bold text-slate-900">Order #{o.id}</p>
                        <p className="text-xs text-slate-500">${o.totalAmount} • {o.orderType}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-600 rounded-lg">{o.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">No orders found. <Link to="/menu" className="text-primary-600 font-bold hover:underline">Order now</Link></p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const revenueDataYear = [
    { name: 'Jan', revenue: 4000, bookings: 24 },
    { name: 'Feb', revenue: 3000, bookings: 13 },
    { name: 'Mar', revenue: 2000, bookings: 98 },
    { name: 'Apr', revenue: 2780, bookings: 39 },
    { name: 'May', revenue: 1890, bookings: 48 },
    { name: 'Jun', revenue: 2390, bookings: 38 },
  ];

  const revenueData30Days = [
    { name: 'Week 1', revenue: 1200, bookings: 15 },
    { name: 'Week 2', revenue: 1800, bookings: 22 },
    { name: 'Week 3', revenue: 1400, bookings: 18 },
    { name: 'Week 4', revenue: 2100, bookings: 28 },
  ];

  const currentChartData = timeRange === '30days' ? revenueData30Days : revenueDataYear;

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 flex items-start justify-between cursor-pointer transition-all"
    >
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 flex items-center font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${trend < 0 && 'rotate-180'}`} />
            {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h2>
            <p className="text-slate-500 mt-1">Real-time overview of your business performance</p>
          </div>
          <div className="flex items-center space-x-3 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <button 
              onClick={() => setTimeRange('30days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${timeRange === '30days' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${timeRange === 'year' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Last Year
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard title="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon={TrendingUp} trend={12.5} color="bg-primary-600" />
          <StatCard title="Active Bookings" value={stats?.totalBookings || 0} icon={BedDouble} trend={8.2} color="bg-indigo-600" />
          <StatCard title="Available Rooms" value={stats?.availableRooms || 0} icon={CheckCircle} color="bg-emerald-600" />
          <StatCard title="Pending Orders" value={stats?.pendingOrders || 0} icon={Clock} trend={-2.4} color="bg-amber-600" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Revenue Chart */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Revenue Overview</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bookings Chart */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Bookings Trend</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="bookings" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
