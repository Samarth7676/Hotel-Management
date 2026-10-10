# Hotel Management System

A modern hotel and restaurant management web application designed to manage rooms, bookings, menu items, orders, inventory, and admin tasks in a single dashboard.

This repository contains the full project under the `RestoManagement/` folder, including the frontend, backend API, MySQL schema, and setup scripts.

## Overview

The system is built to support:

- Hotel room listing and booking management
- Restaurant menu and order handling
- Inventory and stock management
- Booking and customer tracking
- Admin dashboard and reporting views
- Responsive user interface for desktop and mobile screens
- Separate frontend and backend services for better scalability

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Router DOM
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MySQL2
- dotenv
- CORS

### Database
- MySQL

### Tools
- npm
- nodemon
- VS Code
- Git

## Project Structure

```text
Hotel-Management/
├── README.md                      # Repository overview
├── RestoManagement/
│   ├── README.md                  # Main project documentation
│   ├── backend/
│   │   ├── .env                   # Database and port configuration
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── server.js              # Express API entry point
│   │   ├── src/
│   │   └── target/
│   ├── frontend/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   ├── index.html
│   │   ├── src/
│   │   ├── dist/
│   │   └── node_modules/
│   ├── database/
│   │   ├── schema.sql             # Database tables
│   │   ├── sample-data.sql        # Seed data
│   │   └── data/
│   ├── docs/
│   ├── scripts/
│   ├── .vscode/
│   └── .tools/
└── .gitignore
```

## Features

### Hotel Management
- Room catalog with room type and availability
- Booking creation and date-based checks
- Customer booking records
- Room status tracking

### Restaurant Management
- Menu item management
- Orders by dine-in, takeaway, or delivery type
- Kitchen-ready order flow
- Table and order tracking

### Admin Dashboard
- Overview analytics
- Booking and revenue insights
- Inventory tracking
- Reports and operational metrics

### User Experience
- Attractive modern UI
- Responsive dashboard layout
- Smooth animations and transitions
- Role-based access structure

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js 18 or newer
- npm
- MySQL 8+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Samarth7676/Hotel-Management.git
cd Hotel-Management
```

### 2. Set up the database

Open MySQL and create the database:

```sql
CREATE DATABASE hotel_resto_db;
USE hotel_resto_db;
```

Then import the schema and sample data:

```bash
cd RestoManagement/database
mysql -u root -p hotel_resto_db < schema.sql
mysql -u root -p hotel_resto_db < sample-data.sql
```

### 3. Configure backend environment

The backend already contains a `.env` file with default values:

```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=hotel_resto_db
```

If needed, update the values to match your local MySQL configuration.

### 4. Install and run the backend

```bash
cd ../RestoManagement/backend
npm install
npm start
```

The backend server runs on:

```text
http://localhost:8080
```

### 5. Install and run the frontend

```bash
cd ../RestoManagement/frontend
npm install
npm run dev
```

The frontend will run in development mode at:

```text
http://localhost:5173
```

## Default App Flow

- Open the frontend in the browser
- Register or log in to the system
- View rooms, menu items, bookings, and orders
- Manage hotel operations from the dashboard

## Database Schema

The database includes these core entities:

- `users`
- `rooms`
- `bookings`
- `categories`
- `menu_items`
- `orders`
- `order_items`
- `inventory`
- `payments`
- `reviews`

These are defined in:

- `RestoManagement/database/schema.sql`
- `RestoManagement/database/sample-data.sql`

## Notes

This project includes both a Node.js/Express backend and a Java/Spring Boot configuration file (`pom.xml`) in the backend folder. The primary runtime implementation currently used by the app is the Express API (`backend/server.js`), while the Java project files appear to be part of an older or alternate implementation.

## License

This project is for educational and personal portfolio use unless otherwise specified by the repository owner.

## Author

Samarth Patil
