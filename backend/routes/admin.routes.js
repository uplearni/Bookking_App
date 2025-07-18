const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

router.get('/bookings', [verifyToken, isAdmin], adminController.getAllBookings);
router.put('/bookings', [verifyToken, isAdmin], adminController.updateBookingStatus);
router.delete('/bookings/:id', [verifyToken, isAdmin], adminController.deleteBooking);

module.exports = router;