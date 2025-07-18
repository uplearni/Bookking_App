# Booking System

A full-stack web application for scheduling and managing service bookings, built with a **React** frontend and a **Node.js/Express** backend using **PostgreSQL** for data storage. The application supports user and admin roles, with features for booking services, viewing bookings, and managing bookings (admin-only).

## Features
- **User Features**:
  - Sign up and log in with email and password.
  - Browse and book services with a calendar-based interface.
  - View and cancel personal bookings.
- **Admin Features**:
  - Log in with admin credentials to access a dashboard.
  - View all bookings, update booking statuses, and delete bookings.
  - Manage available services (static in frontend, extensible in backend).
- **Authentication**: JWT-based authentication for secure access.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly UI.
- **Role-Based Access**: Restricts admin routes to admin users only.

## Technologies
- **Frontend**: React, Tailwind CSS, Lucide React (icons), Axios
- **Backend**: Node.js, Express.js, PostgreSQL, Sequelize (ORM), JWT, bcrypt
- **Other**: Git for version control, pg-connection-string for database URL parsing

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/uplearni/Bookking_App
cd booking-system
```

### 2. Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following:
   ```
   DATABASE_URL=postgres://your_user:your_password@your_host:5432/booking_system
   JWT_SECRET=your_jwt_secret_key
   PORT=3001
   ```
4. Create the PostgreSQL database:
   ```sql
   createdb booking_system
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001` and seed an admin user (`admin@example.com`/`admin123`).

### 3. Set Up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add a proxy to `frontend/package.json`:
   ```json
   "proxy": "http://localhost:3001"
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

### 4. Verify Setup
- Access the app at `http://localhost:3000`.
- Log in with `admin@example.com`/`admin123` to access the admin dashboard.
- Sign up as a new user to test booking features.

## Usage
- **Admin Access**:
  - Log in with `admin@example.com`/`admin123`.
  - Navigate to the Admin Dashboard to view all bookings, update statuses (e.g., confirm or cancel), and delete bookings.
- **User Access**:
  - Sign up with a new email, name, and password.
  - Log in to book services, view your bookings, or cancel them.
- **Booking Process**:
  - Select a service, date, and time from the booking page.
  - Enter your details and submit to create a booking.
  - View your bookings in the "My Bookings" section.

## API Endpoints
- **Auth**:
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in and receive a JWT.
- **Bookings** (requires JWT):
  - `POST /api/bookings`: Create a new booking.
  - `GET /api/bookings?email=<user-email>`: Get user bookings.
  - `DELETE /api/bookings/:id`: Delete a booking.
- **Admin** (requires JWT and admin role):
  - `GET /api/admin/bookings`: Get all bookings.
  - `PUT /api/admin/bookings`: Update booking status.
  - `DELETE /api/admin/bookings/:id`: Delete a booking.
