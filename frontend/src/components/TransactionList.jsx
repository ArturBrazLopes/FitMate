import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/format';
import { FiMoreVertical, FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

/**
 * TransactionList Component
 * Lists all expenses with three dots menu (View/Edit/Delete)
 */

const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-700',
  Transport: 'bg-blue-100 text-blue-700',
  Leisure: 'bg-purple-100 text-purple-700',
  Bills: 'bg-yellow-100 text-yellow-700',
  Health: 'bg-red-100 text-red-700',
  Others: 'bg-gray-100 text-gray-700'
};

const TransactionList = ({ transactions, onMenuClick }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (e, transactionId, action) => {
    e.stopPropagation();
    setOpenMenu(null);
    onMenuClick(transactionId, action);
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No transactions found</p>
        <p className="text-sm text-gray-400 mt-2">Add a transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === 'income';
          return (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isIncome ? (
                    <FiArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <FiArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{transaction.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                    <span className="text-gray-300">•</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[transaction.category]}`}>
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-lg font-semibold ${
                    isIncome ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === transaction._id ? null : transaction._id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiMoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  {openMenu === transaction._id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenu(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <div className="py-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleMenuClick(e, transaction._id, 'view')}
                          >
                            View Details
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => handleMenuClick(e, transaction._id, 'edit')}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={(e) => handleMenuClick(e, transaction._id, 'delete')}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;

