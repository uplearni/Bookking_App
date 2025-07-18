const db = require('../models');
const Booking = db.booking;

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    booking.status = status;
    await booking.save();
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    await booking.destroy();
    res.status(200).send({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};