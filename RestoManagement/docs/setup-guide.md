# Setup Guide - Hotel & Restaurant Management System

This guide will help you set up and run the application locally.

## Prerequisites

1.  **Node.js (LTS)**: Required for both the frontend and backend.
2.  **MySQL Server**: Required for the database.
3.  **Git**: Required for version control.
4.  **VS Code**: Recommended IDE with the following extensions:
    *   ES7 React Snippets
    *   Tailwind CSS IntelliSense
    *   Prettier

---

## Database Setup

1.  Open your MySQL client (e.g., MySQL Workbench or Command Line).
2.  Run the following scripts located in the `database/` folder:
    *   `schema.sql`: Creates the database and tables.
    *   `sample-data.sql`: Inserts demo users, rooms, and menu items.

---

## Backend Setup (Node.js)

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file in the `backend/` directory and add your MySQL database credentials (e.g., `DB_USER=root`, `DB_PASSWORD=password`, etc.).
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the application:
    ```bash
    node server.js
    ```
    The backend will start on `http://localhost:8080`.

---

## Frontend Setup (React)

1.  Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

---

## Accessing the Application

1.  Open your browser and go to `http://localhost:5173/login`.
2.  Use the following demo credentials:
    *   **Admin**: `admin` / `password`
    *   **Customer**: `customer1` / `password`
    *   **Staff**: `staff1` / `password`
