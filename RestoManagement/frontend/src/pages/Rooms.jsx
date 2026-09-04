import { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, XCircle, AlertTriangle, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

import { roomApi, bookingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

// EMERGENCY BYPASS: Global variable so rooms remember their status
const getInitialRooms = () => {
  const saved = localStorage.getItem('dummyRooms_v3'); // Force clear old cache
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, roomNumber: '101', roomType: 'SINGLE', pricePerNight: 50.00, status: 'AVAILABLE', description: 'Cozy single room with basic amenities', imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500&auto=format&fit=crop' },
    { id: 2, roomNumber: '102', roomType: 'SINGLE', pricePerNight: 55.00, status: 'DIRTY', description: 'Cozy single room with pool view', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500&auto=format&fit=crop' },
    { id: 3, roomNumber: '201', roomType: 'DOUBLE', pricePerNight: 85.00, status: 'BOOKED', description: 'Spacious double room for families', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=500&auto=format&fit=crop' },
    { id: 4, roomNumber: '202', roomType: 'DOUBLE', pricePerNight: 90.00, status: 'AVAILABLE', description: 'Spacious double room with balcony', imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500&auto=format&fit=crop' },
    { id: 5, roomNumber: '301', roomType: 'SUITE', pricePerNight: 150.00, status: 'AVAILABLE', description: 'Luxury suite with balcony and view', imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=500&auto=format&fit=crop' },
    { id: 6, roomNumber: '401', roomType: 'DELUXE', pricePerNight: 250.00, status: 'MAINTENANCE', description: 'Premium deluxe room with all luxuries', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=500&auto=format&fit=crop' },
    { id: 7, roomNumber: '501', roomType: 'SUITE', pricePerNight: 350.00, status: 'AVAILABLE', description: 'Penthouse suite with panoramic city views', imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a420325142?q=80&w=500&auto=format&fit=crop' },
  ];
};
let globalDummyRooms = getInitialRooms();

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New: State to hold the search query
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    roomType: 'SINGLE',
    pricePerNight: '',
    description: ''
  });
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [roomToBook, setRoomToBook] = useState(null);
  const [bookingDates, setBookingDates] = useState({ checkIn: '', checkOut: '' });
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const canManageRooms = user?.role === 'ADMIN' || user?.role === 'STAFF';

  const saveRooms = (nextRooms) => {
    const normalizedRooms = Array.isArray(nextRooms) ? nextRooms : [];
    globalDummyRooms = normalizedRooms;
    localStorage.setItem('dummyRooms_v3', JSON.stringify(normalizedRooms));
    setRooms(normalizedRooms);
    window.dispatchEvent(new CustomEvent('rooms:updated', { detail: normalizedRooms }));
  };

  const syncRoomsFromStorage = () => {
    const savedRooms = JSON.parse(localStorage.getItem('dummyRooms_v3') || 'null');
    const nextRooms = Array.isArray(savedRooms) && savedRooms.length ? savedRooms : getInitialRooms();
    globalDummyRooms = nextRooms;
    setRooms(nextRooms);
  };

  const fetchRooms = async () => {
    try {
      const savedRooms = JSON.parse(localStorage.getItem('dummyRooms_v3') || 'null');
      const sourceRooms = Array.isArray(savedRooms) && savedRooms.length ? savedRooms : [...globalDummyRooms];
      setRooms(sourceRooms);
      globalDummyRooms = sourceRooms;
    } catch (err) {
      console.error('Error fetching rooms from backend. Using dummy data instead:', err);
      setRooms([...globalDummyRooms]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();

    const handleStorageUpdate = (event) => {
      if (event.key === 'dummyRooms_v3' || event.type === 'rooms:updated') {
        syncRoomsFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('rooms:updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('rooms:updated', handleStorageUpdate);
    };
  }, []);

  const handleBookRoom = (roomId) => {
    setRoomToBook(roomId);
    setBookingDates({ checkIn: '2026-05-01', checkOut: '2026-05-05' });
    setIsBookModalOpen(true);
  };

  const confirmBookRoom = async (e) => {
    e.preventDefault();
    if (!bookingDates.checkIn || !bookingDates.checkOut || !roomToBook) return;

    setBookingLoading(true);
    try {
      const updatedRooms = globalDummyRooms.map(r => r.id === roomToBook ? { ...r, status: 'BOOKED' } : r);
      saveRooms(updatedRooms);
      setIsBookModalOpen(false);
      setRoomToBook(null);
    } catch (err) {
      console.error('Booking failed', err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelRoom = async (roomId) => {
    setBookingLoading(true);
    try {
      const updatedRooms = globalDummyRooms.map(r => r.id === roomId ? { ...r, status: 'AVAILABLE' } : r);
      saveRooms(updatedRooms);
    } catch (err) {
      console.error('Cancellation failed', err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleAddRoomSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const newId = Math.max(...globalDummyRooms.map(r => r.id), 0) + 1;
      const roomToAdd = {
        ...newRoom,
        id: newId,
        pricePerNight: parseFloat(newRoom.pricePerNight) || 0,
        status: 'AVAILABLE',
        imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500&auto=format&fit=crop'
      };
      const updatedRooms = [...globalDummyRooms, roomToAdd];
      saveRooms(updatedRooms);
      setIsAddModalOpen(false);
      setNewRoom({ roomNumber: '', roomType: 'SINGLE', pricePerNight: '', description: '' });
    } catch (err) {
      console.error('Error adding room:', err);
    }
  };

  const initiateEditRoom = (room) => {
    setEditingRoom({ ...room });
    setIsEditModalOpen(true);
  };

  const handleEditRoomSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const updatedRooms = globalDummyRooms.map(r => 
      r.id === editingRoom.id 
        ? { ...editingRoom, pricePerNight: parseFloat(editingRoom.pricePerNight) || 0 }
        : r
    );
    saveRooms(updatedRooms);
    setIsEditModalOpen(false);
    setEditingRoom(null);
  };

  const initiateDeleteRoom = (id) => {
    setRoomToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteRoom = () => {
    if (!roomToDelete || !canManageRooms) return;
    const updatedRooms = globalDummyRooms.filter(r => r.id !== roomToDelete);
    saveRooms(updatedRooms);
    setDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const handleStatusChange = (roomId, newStatus) => {
    if (!canManageRooms) return;
    const updatedRooms = globalDummyRooms.map(r => r.id === roomId ? { ...r, status: newStatus } : r);
    saveRooms(updatedRooms);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const statusColors = {
    AVAILABLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    BOOKED: 'bg-primary-100 text-primary-700 border-primary-200',
    MAINTENANCE: 'bg-amber-100 text-amber-700 border-amber-200',
    DIRTY: 'bg-red-100 text-red-700 border-red-200',
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

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.roomType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All Types' || room.roomType.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All Status' || room.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{user?.role === 'CUSTOMER' ? 'Available Rooms' : 'Room Management'}</h2>
            <p className="text-slate-500 mt-1">{user?.role === 'CUSTOMER' ? 'Find and book the perfect room for your stay' : 'Add, edit, and monitor your hotel rooms'}</p>
          </div>
          {canManageRooms && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Room</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-slate-100 p-4 rounded-2xl shadow-sm border border-slate-300/40 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search rooms by number or type..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-slate-900" // Added text-slate-900 for explicit text color
              value={searchQuery} // Bind the input value to the searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
            />
          </div>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 bg-white text-slate-600 font-medium"
          >
            <option>All Types</option>
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
            <option>Deluxe</option>
          </select>
          {canManageRooms && (
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-primary-500/20 bg-white text-slate-600 font-medium"
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Booked</option>
              <option>Maintenance</option>
              <option>Dirty</option>
            </select>
          )}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> 
          {filteredRooms.map((room) => ( // Render filtered rooms instead of all rooms
            <motion.div
              key={room.id}
              whileHover={{ y: -5 }}
              className="bg-slate-100 rounded-2xl shadow-sm border border-slate-300/40 overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-slate-200">
                <div className="absolute top-4 right-4 z-10">
                {canManageRooms ? (
                  <select 
                    value={room.status} 
                    onChange={(e) => handleStatusChange(room.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border focus:ring-2 focus:ring-primary-500/20 cursor-pointer shadow-sm ${statusColors[room.status]}`}
                  >
                    <option value="AVAILABLE" className="bg-white text-slate-700">AVAILABLE</option>
                    <option value="BOOKED" className="bg-white text-slate-700">BOOKED</option>
                    <option value="MAINTENANCE" className="bg-white text-slate-700">MAINTENANCE</option>
                    <option value="DIRTY" className="bg-white text-slate-700">DIRTY</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${statusColors[room.status]}`}>
                    {room.status}
                  </span>
                )}
                </div>
                <img 
                  src={room.imageUrl || `https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500&auto=format&fit=crop`} 
                  alt={room.roomNumber}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-slate-900">Room {room.roomNumber}</h4>
                  <span className="text-primary-600 font-bold">${room.pricePerNight}/night</span>
                </div>
                <p className="text-slate-500 text-sm mb-4">{room.roomType} • {room.description}</p>
                <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {canManageRooms && (
                      <>
                        <button 
                          onClick={() => initiateEditRoom(room)}
                          className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit Room"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => initiateDeleteRoom(room.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Room"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {user?.role === 'CUSTOMER' ? (
                    room.status === 'AVAILABLE' ? (
                      <button 
                        onClick={() => handleBookRoom(room.id)}
                        disabled={bookingLoading}
                        className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{bookingLoading ? 'Booking...' : 'Book Now'}</span>
                      </button>
                    ) : room.status === 'BOOKED' ? (
                      <span className="text-xs font-bold text-amber-600">Booked by another guest</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">Not Available</span>
                    )
                  ) : (
                    room.status === 'AVAILABLE' ? (
                      <button 
                        onClick={() => handleBookRoom(room.id)}
                        disabled={bookingLoading}
                        className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{bookingLoading ? 'Booking...' : 'Book Now'}</span>
                      </button>
                    ) : room.status === 'BOOKED' ? (
                      <button 
                        onClick={() => handleCancelRoom(room.id)}
                        disabled={bookingLoading}
                        className="flex items-center space-x-1.5 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>{bookingLoading ? 'Processing...' : 'Cancel Booking'}</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">Not Available</span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add New Room Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-8 overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Room</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddRoomSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                  <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={newRoom.roomNumber} onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})} placeholder="e.g. 101" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Type</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={newRoom.roomType} onChange={e => setNewRoom({...newRoom, roomType: e.target.value})}>
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="SUITE">Suite</option>
                    <option value="DELUXE">Deluxe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price Per Night ($)</label>
                  <input type="number" required min="0" step="0.01" className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={newRoom.pricePerNight} onChange={e => setNewRoom({...newRoom, pricePerNight: e.target.value})} placeholder="99.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" rows="3" value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} placeholder="Room description..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 mt-6 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md">
                  Save Room
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Room Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
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
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Delete Room?</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Are you sure you want to delete this room? This action cannot be undone and will remove it from the system completely.
                </p>
                <div className="flex w-full space-x-4">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 py-3.5 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteRoom}
                    className="flex-1 py-3.5 px-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Room Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-8 overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Room</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleEditRoomSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                  <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={editingRoom.roomNumber} onChange={e => setEditingRoom({...editingRoom, roomNumber: e.target.value})} placeholder="e.g. 101" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Type</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={editingRoom.roomType} onChange={e => setEditingRoom({...editingRoom, roomType: e.target.value})}>
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="SUITE">Suite</option>
                    <option value="DELUXE">Deluxe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={editingRoom.status} onChange={e => setEditingRoom({...editingRoom, status: e.target.value})}>
                    <option value="AVAILABLE">Available</option>
                    <option value="BOOKED">Booked</option>
                    <option value="MAINTENANCE">Under Maintenance</option>
                    <option value="DIRTY">Dirty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price Per Night ($)</label>
                  <input type="number" required min="0" step="0.01" className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={editingRoom.pricePerNight} onChange={e => setEditingRoom({...editingRoom, pricePerNight: e.target.value})} placeholder="99.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" rows="3" value={editingRoom.description} onChange={e => setEditingRoom({...editingRoom, description: e.target.value})} placeholder="Room description..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 mt-6 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md">
                  Update Room
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Room Modal */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-8 overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shadow-sm border border-primary-100">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Book Room</h3>
                </div>
                <button onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={confirmBookRoom} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-in Date</label>
                  <input type="date" required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={bookingDates.checkIn} onChange={e => setBookingDates({...bookingDates, checkIn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-out Date</label>
                  <input type="date" required className="w-full px-4 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-primary-500/20 bg-white" value={bookingDates.checkOut} onChange={e => setBookingDates({...bookingDates, checkOut: e.target.value})} />
                </div>
                <button type="submit" disabled={bookingLoading} className="w-full py-3 mt-6 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md disabled:opacity-50">
                  {bookingLoading ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Rooms;
