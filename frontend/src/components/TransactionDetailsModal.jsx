import React from 'react';
import { FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../utils/format';

const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-700',
  Transport: 'bg-blue-100 text-blue-700',
  Leisure: 'bg-purple-100 text-purple-700',
  Bills: 'bg-yellow-100 text-yellow-700',
  Health: 'bg-red-100 text-red-700',
  Others: 'bg-gray-100 text-gray-700'
};

const TransactionDetailsModal = ({ isOpen, onClose, transaction, onEdit, onDelete }) => {
  if (!isOpen || !transaction) return null;

  const isIncome = transaction.type === 'income';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className={`inline-block px-4 py-2 rounded-full mb-2 ${
              isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isIncome ? 'Income' : 'Expense'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">{transaction.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${
              isIncome ? 'text-green-600' : 'text-red-600'
            }`}>
              {isIncome ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_COLORS[transaction.category]}`}>
                {transaction.category}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
              <p className="text-gray-800">{formatDate(transaction.date)}</p>
            </div>

            {transaction.description && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <p className="text-gray-800">{transaction.description}</p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onEdit(transaction);
                onClose();
              }}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this transaction?')) {
                  onDelete(transaction._id);
                  onClose();
                }
              }}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;

