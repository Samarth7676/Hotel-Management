import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./components/PremiumLogin'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Menu = lazy(() => import('./pages/Menu'));
const Orders = lazy(() => import('./pages/Orders'));
const Bookings = lazy(() => import('./pages/Bookings'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
    />
  </div>
);

const PrivateRoute = ({ children, roles }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!token) return <Navigate to="/login" />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/rooms" element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            } />
            <Route path="/menu" element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            } />
            <Route path="/orders" element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            } />
            <Route path="/bookings" element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
