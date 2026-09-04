import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Package, User, Coffee, Utensils, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

import { orderApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

// EMERGENCY BYPASS: Define outside to remember state
const getInitialOrders = () => {
  const saved = localStorage.getItem('dummyOrders');
  if (saved) return JSON.parse(saved);
  return [
    { id: 501, tableNumber: '12', orderType: 'DINE_IN', totalAmount: 45.98, status: 'PENDING', createdAt: new Date().toISOString(), items: [{ menuItem: { name: 'Grilled Salmon' }, quantity: 1 }, { menuItem: { name: 'Cappuccino' }, quantity: 2 }] },
    { id: 502, tableNumber: '5', orderType: 'DINE_IN', totalAmount: 15.99, status: 'PREPARING', createdAt: new Date(Date.now() - 15 * 60000).toISOString(), items: [{ menuItem: { name: 'Beef Burger' }, quantity: 1 }] },
    { id: 503, tableNumber: 'N/A', orderType: 'TAKEAWAY', totalAmount: 22.50, status: 'READY', createdAt: new Date(Date.now() - 30 * 60000).toISOString(), items: [{ menuItem: { name: 'Spring Rolls' }, quantity: 2 }] },
    { id: 504, tableNumber: '8', orderType: 'DINE_IN', totalAmount: 115.00, status: 'SERVED', createdAt: new Date(Date.now() - 60 * 60000).toISOString(), items: [{ menuItem: { name: 'Chef Special' }, quantity: 3 }] },
  ];
};
let globalDummyOrders = getInitialOrders();

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const syncOrders = () => {
    const saved = localStorage.getItem('dummyOrders');
    const nextOrders = saved ? JSON.parse(saved) : globalDummyOrders;
    globalDummyOrders = nextOrders;
    setOrders(nextOrders);
  };

  const fetchOrders = async () => {
    try {
      syncOrders();
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const onOrdersChange = () => syncOrders();
    window.addEventListener('orders:updated', onOrdersChange);

    return () => {
      window.removeEventListener('orders:updated', onOrdersChange);
    };
  }, [user]);

  const statusIcons = {
    PENDING: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    PREPARING: { icon: Coffee, color: 'text-primary-500', bg: 'bg-primary-50', border: 'border-primary-100' },
    READY: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    SERVED: { icon: Package, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-100' },
  };

  const updateStatus = async (id, nextStatus) => {
    try {
      globalDummyOrders = globalDummyOrders.map(o => o.id === id ? { ...o, status: nextStatus } : o);
      localStorage.setItem('dummyOrders', JSON.stringify(globalDummyOrders));
      setOrders([...globalDummyOrders]);
      window.dispatchEvent(new CustomEvent('orders:updated'));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
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

  if (user?.role === 'CUSTOMER') {
    return (
      <Layout>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Orders</h2>
            <p className="text-slate-500 mt-1">Track the status of your recent food orders</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm font-bold text-slate-400">Order #{order.id}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{order.orderType}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${statusIcons[order.status]?.bg || 'bg-slate-100'} ${statusIcons[order.status]?.color || 'text-slate-600'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="font-bold text-slate-900">${order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Kitchen Order Tracking</h2>
            <p className="text-slate-500 mt-1">Real-time KOT system for managing restaurant orders</p>
          </div>
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Live System Active</span>
          </div>
        </div>

        {/* Order Status Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(statusIcons).map((status) => (
            <div key={status} className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-xl border ${statusIcons[status].bg} ${statusIcons[status].border}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusIcons[status].bg} shadow-sm`}>
                    {(() => {
                      const Icon = statusIcons[status].icon;
                      return <Icon className={`w-5 h-5 ${statusIcons[status].color}`} />;
                    })()}
                  </div>
                  <span className={`font-bold text-sm ${statusIcons[status].color}`}>{status}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md shadow-sm">
                  {orders.filter(o => o.status === status).length}
                </span>
              </div>

              <div className="space-y-4 min-h-[500px] bg-slate-50/50 rounded-2xl p-2">
                <AnimatePresence mode="popLayout">
                  {orders.filter(o => o.status === status).map((order) => (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400">#{order.id}</span>
                        <div className="flex items-center space-x-1 text-xs text-slate-400 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                          {order.tableNumber !== 'N/A' && order.tableNumber ? order.tableNumber : <Package className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{order.tableNumber !== 'N/A' && order.tableNumber ? `Table ${order.tableNumber}` : 'Takeaway'}</p>
                          <p className="text-xs text-slate-500 font-medium">{order.orderType}</p>
                        </div>
                      </div>

                      <div className="space-y-1 mb-6">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
                            <Utensils className="w-3.5 h-3.5 text-slate-300" />
                            <span>{item.menuItem.name} x{item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-sm font-bold text-slate-900">${order.totalAmount}</span>
                        {status === 'PENDING' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'PREPARING')}
                            className="px-4 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                          >
                            Accept
                          </button>
                        )}
                        {status === 'PREPARING' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'READY')}
                            className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                          >
                            Ready
                          </button>
                        )}
                        {status === 'READY' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'SERVED')}
                            className="px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
