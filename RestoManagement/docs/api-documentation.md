# API Documentation - Hotel & Restaurant Management System

This document outlines the available RESTful API endpoints for the system.

## Authentication APIs

### 1. User Login
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "admin",
    "role": "ADMIN"
  }
  ```

---

## Room Management APIs

### 2. Get All Rooms
- **URL**: `/api/v1/rooms`
- **Method**: `GET`
- **Access**: All

### 3. Create Room
- **URL**: `/api/v1/rooms`
- **Method**: `POST`
- **Access**: ADMIN, STAFF

---

## Booking Management APIs

### 4. Create Booking
- **URL**: `/api/v1/bookings`
- **Method**: `POST`
- **Access**: CUSTOMER, STAFF

### 5. Get My Bookings
- **URL**: `/api/v1/bookings/my`
- **Method**: `GET`
- **Access**: CUSTOMER

---

## Restaurant Management APIs

### 6. Get Menu Items
- **URL**: `/api/v1/menu`
- **Method**: `GET`
- **Access**: All

### 7. Create Order (KOT)
- **URL**: `/api/v1/orders`
- **Method**: `POST`
- **Access**: CUSTOMER, STAFF

---

## Admin Dashboard APIs

### 8. Get Statistics
- **URL**: `/api/v1/dashboard/stats`
- **Method**: `GET`
- **Access**: ADMIN

---

## AI Features APIs

### 9. Get Recommendations
- **URL**: `/api/v1/ai/recommendations`
- **Method**: `GET`
- **Access**: CUSTOMER

### 10. AI Chatbot
- **URL**: `/api/v1/ai/chat`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "message": "How can I book a room?"
  }
  ```
- **Access**: All
