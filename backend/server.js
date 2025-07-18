const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Sync database and seed admin user
db.sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  seedAdminUser();
}).catch(err => {
  console.error('Failed to sync database:', err);
});

const seedAdminUser = async () => {
  const Role = db.role;
  const User = db.user;
  const bcrypt = require('bcrypt');

  // Create roles
  await Role.create({ id: 1, name: 'user' });
  await Role.create({ id: 2, name: 'admin' });

  // Create admin user
  const admin = await User.findOne({ where: { email: 'admin@example.com' } });
  if (!admin) {
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 8),
    }).then(user => {
      user.setRoles([2]); // Assign admin role
    });
  }
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});