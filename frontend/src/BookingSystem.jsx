import React, { useState, useEffect } from 'react';
import { DUMMY_SERVICES, DUMMY_BOOKINGS, DUMMY_TIME_SLOTS } from './data/dummyData';
import { getCurrentUser, logout } from './utils/auth';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import BookingPage from './components/BookingPage';
import MyBookings from './components/MyBookings';
import AdminDashboard from './components/AdminDashboard';
import ConfirmationModal from './components/ConfirmationModal';
import Login from './components/Login';
import Signup from './components/Signup';

const BookingSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS);
  const [services, setServices] = useState(DUMMY_SERVICES);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (!currentUser) {
      setCurrentView('login');
    }
  }, []);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleBooking = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    const newBooking = {
      id: bookings.length + 1,
      customerName: bookingForm.name,
      email: bookingForm.email,
      phone: bookingForm.phone,
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      status: 'pending'
    };
    
    setBookings([...bookings, newBooking]);
    setShowConfirmation(true);
    
    setBookingForm({ name: '', email: '', phone: '', message: '' });
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'home' && (
        <Navigation 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          user={user} 
          handleLogout={handleLogout} 
        />
      )}
      
      {currentView === 'home' && <LandingPage services={services} setCurrentView={setCurrentView} />}
      {currentView === 'booking' && user && (
        <BookingPage
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          getAvailableDates={getAvailableDates}
          generateCalendarDays={generateCalendarDays}
          timeSlots={DUMMY_TIME_SLOTS}
          handleBooking={handleBooking}
        />
      )}
      {currentView === 'my-bookings' && user && <MyBookings bookings={bookings} deleteBooking={deleteBooking} />}
      {currentView === 'admin' && user && user.role === 'admin' && (
        <AdminDashboard
          bookings={bookings}
          services={services}
          updateBookingStatus={updateBookingStatus}
          deleteBooking={deleteBooking}
        />
      )}
      {currentView === 'login' && (
        <Login setUser={setUser} setCurrentView={setCurrentView} />
      )}
      {currentView === 'signup' && (
        <Signup setUser={setUser} setCurrentView={setCurrentView} />
      )}
      
      {showConfirmation && (
        <ConfirmationModal
          selectedService={selectedService}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setShowConfirmation={setShowConfirmation}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  );
};

export default BookingSystem;