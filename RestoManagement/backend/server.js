require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json()); // Allows the backend to accept JSON data from the frontend
app.use(cors());         // Allows cross-origin requests from your frontend

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'hotel_resto_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
pool.getConnection()
    .then(conn => {
        console.log('✅ Connected successfully to MySQL database (hotel_resto_db)!');
        conn.release();
    })
    .catch(err => console.error('❌ Database connection failed:', err.message));

// ==========================================
// API ROUTES
// ==========================================

// 0. Root route to verify server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel & Restaurant Management System API!');
});

// 1. Get all available menu items
app.get('/api/menu', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT m.*, c.name as category_name 
            FROM menu_items m 
            JOIN categories c ON m.category_id = c.id 
            WHERE m.available = TRUE
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Get all available hotel rooms
app.get('/api/rooms', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rooms WHERE status = "AVAILABLE"');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});