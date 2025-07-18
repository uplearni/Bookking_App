import React from 'react';
import { Calendar, LogOut } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView, user, handleLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center"
            >
              <Calendar className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">BookEasy</h1>
            </button>
          </div>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-gray-700">{user.email} ({user.role})</span>
                <button 
                  onClick={() => setCurrentView('home')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'home' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setCurrentView('booking')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'booking' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Book Now
                </button>
                <button 
                  onClick={() => setCurrentView('my-bookings')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'my-bookings' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  My Bookings
                </button>
                {user.role === 'admin' && (
                  <button 
                    onClick={() => setCurrentView('admin')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    Admin
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-red-600 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('login')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'login' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentView('signup')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'signup' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;