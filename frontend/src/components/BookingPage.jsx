import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingPage = ({
  services,
  selectedService,
  setSelectedService,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  bookingForm,
  setBookingForm,
  currentMonth,
  setCurrentMonth,
  getAvailableDates,
  generateCalendarDays,
  timeSlots,
  handleBooking
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white mb-2">Book Your Appointment</h2>
            <p className="text-blue-100">Choose your service and preferred time</p>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Service</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedService?.id === service.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold text-blue-600">${service.price}</span>
                      <span className="text-sm text-gray-500">{service.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedService && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Date</h3>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h4 className="text-lg font-semibold">
                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button 
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-sm font-medium text-gray-500">{day}</div>
                    ))}
                    {generateCalendarDays().map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isAvailable = getAvailableDates().includes(date.toISOString().split('T')[0]);
                      const isSelected = selectedDate === date.toISOString().split('T')[0];
                      
                      return (
                        <button
                          key={index}
                          onClick={() => isAvailable && setSelectedDate(date.toISOString().split('T')[0])}
                          disabled={!isAvailable}
                          className={`p-2 text-sm rounded-lg transition-colors ${
                            isSelected 
                              ? 'bg-blue-600 text-white' 
                              : isAvailable 
                              ? 'hover:bg-blue-100 text-gray-900' 
                              : 'text-gray-400 cursor-not-allowed'
                          } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {selectedDate && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Time</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === time 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any special requests or notes"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedTime && bookingForm.name && bookingForm.email && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedService.duration} minutes</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-blue-600">${selectedService.price}</span>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;