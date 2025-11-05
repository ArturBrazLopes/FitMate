import React from 'react';
import { FiX } from 'react-icons/fi';
import { formatCurrency } from '../utils/format';

/**
 * CategoryDetailsModal Component
 * Shows details of expenses in a specific category
 */
const CategoryDetailsModal = ({ isOpen, onClose, category, transactions }) => {
  if (!isOpen || !category) return null;

  const categoryTransactions = transactions.filter(
    tx => tx.category === category && tx.type === 'expense'
  );

  const total = categoryTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Category: {category}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(total)}</p>
            <p className="text-sm text-gray-500 mt-1">{categoryTransactions.length} transaction(s)</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">Transactions:</h3>
            {categoryTransactions.length > 0 ? (
              categoryTransactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{tx.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">{formatCurrency(tx.amount)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No transactions in this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsModal;

