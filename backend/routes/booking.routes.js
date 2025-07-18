const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/authJwt');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/', verifyToken, bookingController.getUserBookings);
router.delete('/:id', verifyToken, bookingController.deleteBooking);

module.exports = router;