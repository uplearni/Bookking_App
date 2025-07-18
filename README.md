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

## Project Structure
```
booking-system/
├── frontend/
│   ├── src/
│   │   ├── components/           # React components (e.g., Login.jsx, AdminDashboard.jsx)
│   │   ├── data/                 # Static data (dummyData.js)
│   │   ├── utils/                # Utility functions (auth.js)
│   │   ├── BookingSystem.jsx     # Main app component
│   │   ├── App.jsx               # Root component
│   │   ├── index.js              # Entry point
│   │   ├── index.css             # Global styles
│   ├── package.json              # Frontend dependencies
├── backend/
│   ├── config/                   # Configuration files (auth, database)
│   ├── models/                   # Sequelize models (user, role, booking)
│   ├── routes/                   # API routes (auth, booking, admin)
│   ├── middleware/               # Authentication middleware (JWT)
│   ├── controllers/              # Route handlers
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
```

## Prerequisites
- **Node.js** (>= 14.x): For running the frontend and backend.
- **PostgreSQL** (>= 12.x): For the database.
- **Git**: For version control.
- **npm**: Package manager (comes with Node.js).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
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
   - Replace `your_user`, `your_password`, `your_host` with your PostgreSQL credentials.
   - For local development, use `postgres://postgres:your_password@localhost:5432/booking_system`.
   - Generate a secure `JWT_SECRET` (e.g., using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
4. Create the PostgreSQL database:
   ```sql
   createdb booking_system
   ```
   Or, if using a cloud provider, ensure the database is created and the `DATABASE_URL` is correct.
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
3. Add a proxy to `frontend/package.json` to avoid CORS issues:
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

## Testing
1. **Test Admin Access**:
   - Log in with `admin@example.com`/`admin123`.
   - Verify access to the Admin Dashboard and ability to manage bookings.
2. **Test User Access**:
   - Sign up with a new account.
   - Create, view, and delete bookings.
3. **Test API**:
   - Use Postman or curl to test endpoints:
     ```bash
     curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"admin123"}'
     ```
   - Use the returned JWT in the `x-access-token` header for protected routes.

## Deployment
### Backend
1. Deploy to a platform like Render or Heroku.
2. Set environment variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`) in the platform's dashboard.
3. Ensure the PostgreSQL database is hosted (e.g., on Render, AWS RDS) and accessible.

### Frontend
1. Deploy to Netlify or Vercel.
2. Update the API URL in `frontend/src/utils/auth.js` to the backend's production URL (e.g., `https://your-backend-url/api/auth`).
3. Add the backend URL to Netlify/Vercel environment variables to avoid CORS issues.

### Database
- Use a managed PostgreSQL service (e.g., Render, AWS RDS).
- Update `backend/config/db.config.js` with the production `DATABASE_URL`.

## Security Notes
- Store `DATABASE_URL` and `JWT_SECRET` in environment variables, not in code.
- Use HTTPS in production for secure communication.
- Consider using HttpOnly cookies for JWT storage to mitigate XSS risks.
- Regularly update dependencies to address security vulnerabilities.

## Troubleshooting
- **Database Connection Errors**: Verify `DATABASE_URL` and ensure the PostgreSQL server is running.
- **CORS Issues**: Ensure the frontend proxy is set or the backend allows the frontend's origin.
- **JWT Errors**: Check that the `JWT_SECRET` matches between backend and frontend.
- **Admin Access**: If `admin@example.com` fails, ensure the database is seeded (run `npm start` in `backend/`).

## Contributing
- Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).
- Submit pull requests for review.

## License
MIT License