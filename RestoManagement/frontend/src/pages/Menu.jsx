import { useState, useEffect } from 'react';
import { Plus, Search, ShoppingCart, Star, Clock, Minus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const { addToCart, cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyCategories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];
        const dummyMenu = [
          { id: 1, categoryName: 'Appetizers', name: 'Spring Rolls', price: 8.99, description: 'Crispy vegetarian spring rolls with sweet chili sauce (Veg)', rating: '4.8', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=500&auto=format&fit=crop' },
          { id: 2, categoryName: 'Appetizers', name: 'Chicken Tikka', price: 12.99, description: 'Boneless chicken marinated in spices and grilled to perfection (Non-Veg)', rating: '4.9', imageUrl: 'https://images.unsplash.com/photo-1599487405705-8ebbcba35773?q=80&w=500&auto=format&fit=crop' },
          { id: 3, categoryName: 'Appetizers', name: 'Paneer Tikka', price: 10.99, description: 'Cottage cheese cubes marinated and roasted (Veg)', rating: '4.7', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500&auto=format&fit=crop' },
          { id: 4, categoryName: 'Appetizers', name: 'Garlic Bread', price: 5.99, description: 'Toasted bread with garlic butter and herbs (Veg)', rating: '4.5', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop' },
          { id: 5, categoryName: 'Appetizers', name: 'Crispy Calamari', price: 14.50, description: 'Deep-fried squid rings with tartar sauce (Non-Veg)', rating: '4.6', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500&auto=format&fit=crop' },
          { id: 8, categoryName: 'Main Course', name: 'Grilled Salmon', price: 24.99, description: 'Salmon fillet with roasted vegetables and lemon butter (Non-Veg)', rating: '4.9', imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=500&auto=format&fit=crop' },
          { id: 9, categoryName: 'Main Course', name: 'Butter Chicken', price: 18.99, description: 'Tender chicken cooked in a rich tomato gravy (Non-Veg)', rating: '4.9', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?q=80&w=500&auto=format&fit=crop' },
          { id: 10, categoryName: 'Main Course', name: 'Paneer Butter Masala', price: 16.99, description: 'Cottage cheese cooked in a creamy tomato sauce (Veg)', rating: '4.8', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946cea?q=80&w=500&auto=format&fit=crop' },
          { id: 11, categoryName: 'Main Course', name: 'Chicken Biryani', price: 19.99, description: 'Aromatic basmati rice cooked with spiced chicken (Non-Veg)', rating: '4.9', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop' },
          { id: 19, categoryName: 'Desserts', name: 'Chocolate Lava Cake', price: 7.50, description: 'Warm chocolate cake with a melting molten heart (Veg)', rating: '5.0', imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=500&auto=format&fit=crop' },
          { id: 24, categoryName: 'Beverages', name: 'Cappuccino', price: 4.50, description: 'Rich espresso with frothy steamed milk', rating: '4.7', imageUrl: 'https://images.unsplash.com/photo-1534687941258-1631f4af252a?q=80&w=500&auto=format&fit=crop' },
          { id: 26, categoryName: 'Beverages', name: 'Mango Lassi', price: 4.99, description: 'Traditional Indian yogurt-based mango drink', rating: '4.8', imageUrl: 'https://images.unsplash.com/photo-1546889564-58a5b2cc22c6?q=80&w=500&auto=format&fit=crop' }
        ];
        setMenuItems(dummyMenu);
        setCategories(dummyCategories);
      } catch (err) {
        console.error('Error fetching menu data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.categoryName === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = dietaryFilter === 'All' || (dietaryFilter === 'Veg' && item.description.includes('(Veg)')) || (dietaryFilter === 'Non-Veg' && item.description.includes('(Non-Veg)'));
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handlePlaceOrder = () => {
    if (!user || user.role !== 'CUSTOMER' || cart.length === 0) return;

    const saved = JSON.parse(localStorage.getItem('dummyOrders') || '[]');
    const nextOrderId = saved.length ? Math.max(...saved.map(o => o.id)) + 1 : 501;

    const newOrder = {
      id: nextOrderId,
      tableNumber: 'N/A',
      orderType: 'TAKEAWAY',
      totalAmount: Number(cartTotal.toFixed(2)),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      items: cart.map(item => ({ menuItem: { name: item.name }, quantity: item.quantity }))
    };

    const updatedOrders = [...saved, newOrder];
    localStorage.setItem('dummyOrders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new CustomEvent('orders:updated'));
    clearCart();
    setCartOpen(false);
    setPlacingOrder(false);
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
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{user?.role === 'CUSTOMER' ? 'Order Food' : 'Menu Management'}</h2>
            <p className="text-slate-500 mt-1">{user?.role === 'CUSTOMER' ? 'Browse our delicious menu and place your order' : 'Manage categories, dishes, and real-time availability'}</p>
          </div>
          {user?.role === 'CUSTOMER' && (
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cart.length})</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm whitespace-nowrap ${activeCategory === cat ? 'bg-primary-600 text-white shadow-primary-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search dishes by name or description..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-slate-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 bg-white text-slate-600 font-medium cursor-pointer">
            <option value="All">All Items</option>
            <option value="Veg">Veg Only</option>
            <option value="Non-Veg">Non-Veg Only</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <motion.div key={item.id} whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group">
              <div className="relative h-48 bg-slate-200">
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-amber-500 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{item.rating || '4.5'}</span>
                </div>
                <img src={item.imageUrl || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{item.name}</h4>
                  <span className="text-primary-600 font-bold">${item.price}</span>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-slate-400 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>15-20 min</span>
                  </div>
                  <button onClick={() => user?.role === 'CUSTOMER' && addToCart(item)} disabled={user?.role !== 'CUSTOMER'} className="flex items-center space-x-1.5 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{user?.role === 'CUSTOMER' ? 'Add to Cart' : 'View Only'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {cartOpen && user?.role === 'CUSTOMER' && (
        <div className="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-sm flex items-end justify-end p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Your Cart</h3>
              <button onClick={() => setCartOpen(false)} className="text-slate-500 hover:text-slate-800">✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart className="mx-auto w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <p className="text-sm text-slate-500">${item.price} each</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700"><Minus className="mx-auto w-4 h-4" /></button>
                        <span className="font-bold text-slate-800 min-w-[24px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700"><Plus className="mx-auto w-4 h-4" /></button>
                      </div>
                      <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => { setPlacingOrder(true); handlePlaceOrder(); }} disabled={cart.length === 0 || placingOrder} className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-2xl transition-colors disabled:opacity-60">
                {placingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Menu;
