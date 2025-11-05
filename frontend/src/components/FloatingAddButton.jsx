import React from 'react';
import { FiPlus } from 'react-icons/fi';

const FloatingAddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Add transaction"
    >
      <FiPlus className="w-6 h-6" />
    </button>
  );
};

export default FloatingAddButton;

