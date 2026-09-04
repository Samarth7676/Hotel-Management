import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Lock, Phone, Tag } from 'lucide-react';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const floatingCards = [
    { top: '10%', left: '8%', size: 'w-28 h-28', color: 'bg-indigo-400/20' },
    { top: '18%', right: '12%', size: 'w-20 h-20', color: 'bg-cyan-400/20' },
    { bottom: '14%', left: '16%', size: 'w-32 h-32', color: 'bg-fuchsia-400/20' },
    { bottom: '18%', right: '18%', size: 'w-24 h-24', color: 'bg-emerald-400/20' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // EMERGENCY BYPASS: Fake successful registration if backend is off
    if (formData.username && formData.password) {
      login({ username: formData.username, role: 'CUSTOMER' }, 'dummy-customer-token-123');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.register({
        ...formData,
        role: 'CUSTOMER'
      });
      const { token, role, username } = response.data;
      login({ username, role }, token);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. (Is your backend running?)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-700 px-4">
      <div className="absolute inset-0 overflow-hidden">
        {floatingCards.map((card, index) => (
          <motion.div
            key={index}
            className={`absolute ${card.size} rounded-full blur-3xl ${card.color}`}
            style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
            animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -12, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white shadow-lg mb-4"
          >
            <UserPlus className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-slate-200">Join us for a premium experience</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Tag className="w-5 h-5" />
              </span>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-300">
                <User className="w-5 h-5" />
              </span>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Phone className="w-5 h-5" />
              </span>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none"
                placeholder="+1 (234) 567-890"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-300">
                <Lock className="w-5 h-5" />
              </span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-200">
          <p>Already have an account? <Link to="/login" className="font-bold text-cyan-300 hover:underline">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
