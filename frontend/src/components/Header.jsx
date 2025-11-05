import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatMonth, getPreviousMonth, getNextMonth } from '../utils/format';

const Header = ({ currentMonth, onMonthChange, onLogout }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePreviousMonth = () => {
    const prevMonth = getPreviousMonth(currentMonth);
    onMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = getNextMonth(currentMonth);
    onMonthChange(nextMonth);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary-700">FinMate</h1>
            {user && (
              <span className="text-sm text-gray-600 hidden sm:inline">
                Welcome, {user.name}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Month Selector */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <button
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Previous month"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                {formatMonth(currentMonth)}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Next month"
              >
                <FiChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

