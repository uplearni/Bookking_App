import React from 'react';
import { CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ selectedService, selectedDate, selectedTime, setShowConfirmation, setCurrentView }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked. You'll receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-green-900 mb-2">Booking Details</h4>
            <div className="text-sm text-green-800 space-y-1">
              <p><strong>Service:</strong> {selectedService?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Duration:</strong> {selectedService?.duration} minutes</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowConfirmation(false);
              setCurrentView('my-bookings');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;