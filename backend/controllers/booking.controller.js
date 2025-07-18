const db = require('../models');
const Booking = db.booking;

exports.createBooking = async (req, res) => {
  try {
    const { customerName, email, phone, service, date, time } = req.body;
    const booking = await Booking.create({
      customerName,
      email,
      phone,
      service,
      date,
      time,
      status: 'pending'
    });
    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { email: req.query.email } });
    res.status(200).send(bookings);
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