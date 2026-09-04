import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BedDouble, UtensilsCrossed, Star, ShieldCheck, Clock, MapPin, LayoutDashboard, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // 3D Hover Animation State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="text-2xl font-bold text-slate-200 tracking-tight">HotelResto</Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-300">
          <Link to="/rooms" className="hover:text-slate-100 transition-colors">Rooms</Link>
          <Link to="/menu" className="hover:text-slate-100 transition-colors">Menu</Link>
          <a href="#reviews" className="hover:text-slate-100 transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-slate-100 transition-colors">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/dashboard" className="flex items-center space-x-2 bg-slate-200 text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-300 transition-all shadow-lg shadow-slate-200/10">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors">Sign In</Link>
              <Link to="/register" className="bg-slate-200 text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-300 transition-all shadow-lg shadow-slate-200/10">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-slate-950 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=2500"
            alt="Luxury Lounge Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30"></div>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div {...fadeInUp} className="relative z-10">
            <span className="inline-block px-4 py-1.5 bg-slate-800/60 text-slate-300 border border-slate-700/50 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Premium Experience</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-100 leading-tight mb-8">
              Luxury Living & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Fine Dining</span> in One Place
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Experience the perfect blend of world-class hospitality and gourmet cuisine. Book your stay or reserve a table with just a few clicks.
            </p>
            <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/rooms" className="flex items-center space-x-2 bg-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-300 transition-all shadow-lg shadow-slate-200/10">
                <BedDouble className="w-5 h-5" />
                <span>Book a Room</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/menu" className="flex items-center space-x-2 bg-slate-800/50 text-slate-200 border border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 backdrop-blur-md transition-all shadow-sm">
                <UtensilsCrossed className="w-5 h-5" />
                <span>Order Food</span>
              </Link>
            </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full z-20"
            style={{ perspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div style={{ rotateX, rotateY }} className="relative w-full">
              <motion.div className="relative z-10 rounded-3xl shadow-2xl border border-slate-800 bg-slate-900 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Luxury Hotel" 
                  className="w-full h-[500px] object-cover pointer-events-none"
                />
              </motion.div>
              <motion.div className="absolute -bottom-10 -left-10 z-20 bg-slate-800/95 backdrop-blur-md p-6 rounded-2xl shadow-xl hidden md:block border border-slate-700">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-600" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-200">500+ Guests</p>
                  <p className="text-slate-400">Stayed this month</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-slate-300">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-slate-300" />)}
                <span className="text-xs font-bold text-slate-200 ml-2">4.9/5 Rating</span>
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-200 mb-4">Why Choose Us?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We provide the highest quality services to ensure your comfort and satisfaction during your stay and dining experience.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Safe & Secure", desc: "Your safety is our priority with 24/7 security and encrypted payments." },
            { icon: Clock, title: "24/7 Service", desc: "Our staff is always available to assist you with any needs or requests." },
            { icon: MapPin, title: "Prime Location", desc: "Located in the heart of the city with easy access to all major attractions." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-slate-700/20 hover:border-slate-600 transition-all"
            >
              <div className="w-14 h-14 bg-slate-800 text-slate-200 rounded-2xl flex items-center justify-center mb-6">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-slate-300 py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-slate-200 mb-6">HotelResto</h2>
            <p className="text-slate-400 max-w-sm mb-8">Providing exceptional luxury hospitality and culinary experiences since 2020. Your satisfaction is our mission.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Quick Links</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/rooms" className="hover:text-slate-200 transition-colors">Rooms</Link></li>
              <li><Link to="/menu" className="hover:text-slate-200 transition-colors">Menu</Link></li>
              <li><Link to="/login" className="hover:text-slate-200 transition-colors">Login</Link></li>
              <li><Link to="/login" className="hover:text-slate-200 transition-colors">Staff Login</Link></li>
              <li><Link to="/register" className="hover:text-slate-200 transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Contact Us</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>123 Luxury Avenue, City Center</li>
              <li>+1 (234) 567-890</li>
              <li>contact@hotelresto.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-slate-900 text-center text-sm text-slate-500">
          <p>© 2026 HotelResto Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
