import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pre-calculate random values for rain and stars so they don't jump around on re-renders
const rainDrops = Array.from({ length: 70 }).map(() => ({
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 0.7 + 0.5}s`,
  animationDelay: `${Math.random() * 2}s`,
  opacity: Math.random() * 0.4 + 0.2
}));

const stars = Array.from({ length: 50 }).map(() => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 1}px`,
  animationDelay: `${Math.random() * 3}s`
}));

const PremiumLogin = () => {
  const [isDay, setIsDay] = useState(true);
  const cardRef = useRef(null);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('login');
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSentTo, setOtpSentTo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const normalizePhone = (value) => value.replace(/\D/g, '');

  // Check the current time to determine Day or Night
  useEffect(() => {
    const currentHour = new Date().getHours();
    // Consider "Day" to be between 6 AM and 6 PM (18:00)
    setIsDay(currentHour >= 6 && currentHour < 18);
  }, []);

  // Handle the 3D tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  // Reset the 3D tilt when the mouse leaves
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedPhone = normalizePhone(phone);

    if (normalizedPhone === '9022247676' && password === '9022247676') {
      login({ username: 'admin', role: 'ADMIN' }, 'dummy-admin-token-123');
      navigate('/dashboard');
      return;
    }

    if (normalizedPhone === '9876543211' && password === 'password') {
      login({ username: 'staff1', role: 'STAFF' }, 'dummy-staff-token-789');
      navigate('/dashboard');
      return;
    }

    if (normalizedPhone === '9876543212' && password === 'password') {
      login({ username: 'customer1', role: 'CUSTOMER' }, 'dummy-customer-token-456');
      navigate('/dashboard');
      return;
    }

    try {
      alert('Invalid credentials. Try 9876543210 / password, 9876543211 / password, or 9876543212 / password');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!recoveryPhone.trim()) {
      setResetMessage('Please enter your phone number first.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSentTo(recoveryPhone.trim());
    setResetMessage(`OTP sent successfully to ${recoveryPhone.trim()}.`);
    setOtpInput('');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!generatedOtp) {
      setResetMessage('Please generate an OTP first.');
      return;
    }

    if (otpInput.trim() !== generatedOtp) {
      setResetMessage('Invalid OTP. Please check the code and try again.');
      return;
    }

    if (!newPassword.trim() || newPassword.length < 6) {
      setResetMessage('Please enter a new password with at least 6 characters.');
      return;
    }

    setResetMessage('Password reset successful. You can now sign in with your new password.');
    setView('login');
    setPhone(recoveryPhone || phone);
    setPassword(newPassword);
    setRecoveryPhone('');
    setOtpInput('');
    setGeneratedOtp('');
    setOtpSentTo('');
    setNewPassword('');
  };

  const renderForgotPassword = () => (
    <form onSubmit={handleResetPassword} className="flex flex-col gap-4" style={{ transform: 'translateZ(30px)' }}>
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-semibold ml-1 ${isDay ? 'text-gray-700' : 'text-gray-200'}`}>
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={recoveryPhone}
          onChange={(e) => setRecoveryPhone(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 bg-transparent border-2 ${
            isDay ? 'border-white/50 focus:border-blue-400 focus:bg-white/60 placeholder-gray-400 text-gray-800' : 'border-gray-600 focus:border-indigo-400 focus:bg-black/60 placeholder-gray-500 text-white'
          }`}
        />
      </div>

      <button
        type="button"
        onClick={handleSendOtp}
        className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02] ${
          isDay ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
        }`}
      >
        Generate OTP
      </button>

      <div className="flex flex-col gap-1">
        <label className={`text-sm font-semibold ml-1 ${isDay ? 'text-gray-700' : 'text-gray-200'}`}>
          Enter OTP
        </label>
        <input
          type="text"
          placeholder="6-digit OTP"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 bg-transparent border-2 ${
            isDay ? 'border-white/50 focus:border-blue-400 focus:bg-white/60 placeholder-gray-400 text-gray-800' : 'border-gray-600 focus:border-indigo-400 focus:bg-black/60 placeholder-gray-500 text-white'
          }`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={`text-sm font-semibold ml-1 ${isDay ? 'text-gray-700' : 'text-gray-200'}`}>
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Create new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-4 py-3 pr-14 rounded-xl outline-none transition-all duration-300 bg-transparent border-2 ${
              isDay ? 'border-white/50 focus:border-blue-400 focus:bg-white/60 placeholder-gray-400 text-gray-800' : 'border-gray-600 focus:border-indigo-400 focus:bg-black/60 placeholder-gray-500 text-white'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${isDay ? 'text-blue-600' : 'text-indigo-300'}`}
          >
            {showNewPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {resetMessage && (
        <p className={`text-sm ${resetMessage.includes('successful') ? 'text-emerald-500' : 'text-red-500'}`}>
          {resetMessage}
        </p>
      )}

      {generatedOtp && otpSentTo && (
        <div className={`rounded-xl border p-3 text-sm ${isDay ? 'border-blue-200 bg-blue-50 text-blue-800' : 'border-indigo-500/40 bg-indigo-500/10 text-indigo-100'}`}>
          <p className="font-medium">OTP sent to: {otpSentTo}</p>
          <p className="mt-1 text-lg font-bold tracking-widest">{generatedOtp}</p>
        </div>
      )}

      <button
        type="submit"
        className={`w-full py-3 mt-2 rounded-xl font-bold text-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 ${
          isDay ? 'bg-gradient-to-r from-blue-500 to-sky-400 text-white hover:shadow-blue-300/50' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-500/50'
        }`}
      >
        Reset Password
      </button>

      <button
        type="button"
        onClick={() => setView('login')}
        className={`text-sm font-semibold text-center hover:underline ${isDay ? 'text-blue-600' : 'text-indigo-400'}`}
      >
        Back to Login
      </button>
    </form>
  );

  const renderLogin = () => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ transform: 'translateZ(30px)' }}>
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-semibold ml-1 ${isDay ? 'text-gray-700' : 'text-gray-200'}`}>Phone Number</label>
        <input 
          type="tel" 
          placeholder="Enter your phone number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 bg-transparent border-2 
            ${isDay ? 'border-white/50 focus:border-blue-400 focus:bg-white/60 placeholder-gray-400 text-gray-800' : 'border-gray-600 focus:border-indigo-400 focus:bg-black/60 placeholder-gray-500 text-white'}`} />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className={`text-sm font-semibold ml-1 ${isDay ? 'text-gray-700' : 'text-gray-200'}`}>Password</label>
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full px-4 py-3 pr-14 rounded-xl outline-none transition-all duration-300 bg-transparent border-2 
              ${isDay ? 'border-white/50 focus:border-blue-400 focus:bg-white/60 placeholder-gray-400 text-gray-800' : 'border-gray-600 focus:border-indigo-400 focus:bg-black/60 placeholder-gray-500 text-white'}`} />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${isDay ? 'text-blue-600' : 'text-indigo-300'}`}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm px-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded accent-blue-500 w-4 h-4 cursor-pointer" />
          <span className={isDay ? 'text-gray-600' : 'text-gray-300'}>Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => setView('forgot')}
          className={`font-semibold hover:underline ${isDay ? 'text-blue-600' : 'text-indigo-400'}`}
        >
          Forgot Password?
        </button>
      </div>

      <button type="submit" 
        className={`w-full py-3 mt-4 rounded-xl font-bold text-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 ${isDay ? 'bg-gradient-to-r from-blue-500 to-sky-400 text-white hover:shadow-blue-300/50' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-500/50'}`}
      >
        Sign In
      </button>

      <div className="text-center text-sm mt-2">
        <span className={isDay ? 'text-gray-600' : 'text-gray-300'}>New here? </span>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className={`font-bold hover:underline ${isDay ? 'text-blue-600' : 'text-indigo-400'}`}
        >
          Create Account
        </button>
      </div>
    </form>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-[2000ms] overflow-hidden relative 
      ${isDay ? 'bg-gradient-to-br from-sky-400 via-blue-200 to-orange-200' : 'bg-gradient-to-br from-gray-900 via-slate-800 to-black'}`}>
      
      {/* Inline styles for premium animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fall {
          0% { transform: translateY(-150px); }
          100% { transform: translateY(110vh); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Day / Night Specific Sky Elements */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-[2000ms]">
        {isDay ? (
          <div className="absolute inset-0 opacity-100 animate-in fade-in duration-1000">
            {/* Sun */}
            <div className="absolute top-20 right-32 w-32 h-32 bg-yellow-300 rounded-full shadow-[0_0_80px_40px_rgba(253,224,71,0.5)]"></div>
            {/* Clouds */}
            <div className="absolute top-32 left-20 w-64 h-16 bg-white/50 rounded-full blur-md animate-blob"></div>
            <div className="absolute top-48 right-1/4 w-80 h-20 bg-white/40 rounded-full blur-lg animate-blob animation-delay-4000"></div>
          </div>
        ) : (
          <div className="absolute inset-0 opacity-100 animate-in fade-in duration-1000">
            {/* Moon (Crescent illusion using box-shadow) */}
            <div className="absolute top-20 right-32 w-24 h-24 rounded-full shadow-[-20px_20px_0_0_rgba(241,245,249,0.9)] blur-[1px]"></div>
            {/* Stars */}
            {stars.map((star, i) => (
              <div key={`star-${i}`} className="absolute bg-white rounded-full" style={{
                top: star.top, left: star.left, width: star.size, height: star.size,
                animation: `twinkle 3s infinite ease-in-out`, animationDelay: star.animationDelay
              }}></div>
            ))}
          </div>
        )}
      </div>

      {/* Animated Glowing Background Orbs */}
      <div className={`absolute top-1/4 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob 
        ${isDay ? 'bg-yellow-300' : 'bg-purple-600'}`}></div>
      <div className={`absolute bottom-1/4 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000 
        ${isDay ? 'bg-orange-300' : 'bg-indigo-600'}`}></div>
      <div className={`absolute -bottom-8 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000 
        ${isDay ? 'bg-pink-300' : 'bg-blue-600'}`}></div>

      {/* 3D Glassmorphism Card */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative z-10 w-full max-w-md p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl border transition-transform duration-200 ease-out flex flex-col gap-6
          ${isDay ? 'bg-white/30 border-white/50 text-gray-900' : 'bg-black/40 border-white/10 text-white'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Text content popped out slightly in 3D space */}
        <div className="text-center" style={{ transform: 'translateZ(50px)' }}>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h2>
          <p className={`text-sm font-medium ${isDay ? 'text-gray-700' : 'text-gray-300'}`}>
            {isDay ? 'Good morning! Have a great day ahead.' : 'Good evening! Step into the night.'}
          </p>
        </div>

        {/* Form popped out in 3D space */}
        {view === 'forgot' ? renderForgotPassword() : renderLogin()}
      </div>
    </div>

  );
};

export default PremiumLogin;