import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BedDouble, 
  UtensilsCrossed, 
  ClipboardList, 
  History, 
  LogOut, 
  Menu as MenuIcon, 
  X,
  User,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navItems = user?.role === 'CUSTOMER' ? [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Book a Room', path: '/rooms', icon: BedDouble },
    { name: 'Order Food', path: '/menu', icon: UtensilsCrossed },
    { name: 'My Orders', path: '/orders', icon: ClipboardList }
  ] : [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Rooms', path: '/rooms', icon: BedDouble },
    { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { name: 'Orders', path: '/orders', icon: ClipboardList },
    { name: 'Bookings', path: '/bookings', icon: History },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-primary-600 tracking-tight hover:text-primary-700 transition-colors">
                HotelResto
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                    ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  {user?.username?.charAt(0).toUpperCase() || <User />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user?.username}</p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between lg:justify-end shadow-sm">
          {!isSidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/menu')}
              title="Open cart and menu"
              className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cart?.length}
                </span>
              )}
            </button>
            <span className="text-sm text-slate-500 font-medium">
              {user?.role === 'CUSTOMER' ? 'Hotel & Resto Guest Portal' : 'Hotel & Resto Admin Panel'}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
