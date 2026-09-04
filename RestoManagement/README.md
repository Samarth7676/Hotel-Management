# Hotel & Restaurant Management System (HRMS)

A complete, production-ready, industry-level Restaurant and Hotel Management Web Application.

---

## Features

- **Hotel Management**: Room CRUD, Booking (check-in/out), Availability, Customer History, Housekeeping.
- **Restaurant Management**: Menu Management, Table Reservation, Order Management (Dine-in, Takeaway, Delivery), KOT (Kitchen Order Tracking), Inventory.
- **Admin Dashboard**: Analytics (charts, revenue, bookings), User Management, Reports, Offers & Discounts.
- **Security**: JWT Authentication, Role-based access (Admin, Staff, Customer), BCrypt encryption.
- **AI Features**: Food Recommendation System, Smart Pricing Engine, Rule-based AI Chatbot.
- **UI/UX**: Modern SaaS Dashboard, Responsive design, Tailwind CSS, Framer Motion animations.

---

## Technology Stack

- **Backend**: Java 17, Spring Boot, Spring Security, JPA (Hibernate), MySQL, JWT, Swagger.
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Recharts, Lucide-React.
- **Tools**: Maven, Postman, VS Code.

---

## Project Structure

- `backend/`: Spring Boot application.
- `frontend/`: React application.
- `database/`: SQL scripts for schema and sample data.
- `docs/`: Setup guide and API documentation.
- `scripts/`: Useful scripts for automation.

---

## Quick Start

1.  **Database**: Run `database/schema.sql` and `database/sample-data.sql` in MySQL.
2.  **Backend**: `cd backend && mvn spring-boot:run`.
3.  **Frontend**: `cd frontend && npm install && npm run dev`.
4.  **Login**: Access `http://localhost:5173/login` with `admin` / `password`.

---

## Detailed Documentation

- [Setup Guide](docs/setup-guide.md)
- [API Documentation](docs/api-documentation.md)
- [Database Schema](database/schema.sql)

---

## Author

Developed as a senior full-stack Java architect project.
