import React from 'react';
import { Calendar, Mail, BarChart3 } from 'lucide-react';

const LandingPage = ({ services, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">BookEasy</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentView('booking')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Book Now
              </button>
              <button onClick={() => setCurrentView('my-bookings')} className="text-gray-700 hover:text-blue-600 transition-colors">
                My Bookings
              </button>
              <button onClick={() => setCurrentView('admin')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-blue-600"> Appointments</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional booking system that makes scheduling appointments effortless. 
              Manage your time, grow your business, and delight your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentView('booking')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setCurrentView('demo')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BookEasy?</h3>
            <p className="text-xl text-gray-600">Everything you need to manage appointments professionally</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h4>
              <p className="text-gray-600">Intelligent calendar system that prevents double-booking and optimizes your schedule</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Auto Notifications</h4>
              <p className="text-gray-600">Automated email reminders and confirmations keep everyone informed</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-gray-600">Comprehensive insights into your booking patterns and business performance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600">Professional services tailored to your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-xl shadow-smබින් shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                  <span className="text-sm text-gray-500">{service.duration} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;