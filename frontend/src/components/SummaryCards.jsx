import React from 'react';
import { formatCurrency } from '../utils/format';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

/**
 * SummaryCards Component
 * Shows financial summary: Income, Expenses, Balance (Income - Expenses)
 */
const SummaryCards = ({ totalIncome, totalExpense, balance = 0 }) => {
  const cards = [
    {
      title: 'Total Income',
      value: totalIncome,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Expense',
      value: totalExpense,
      icon: FiTrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Balance',
      value: balance,
      icon: FiDollarSign,
      color: balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bgColor: balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      borderColor: balance >= 0 ? 'border-blue-200' : 'border-red-200'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-6 border-2 ${card.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>
                    {formatCurrency(card.value)}
                  </p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-full`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Final Balance Display */}
      {balance !== undefined && (
        <div className={`mb-6 rounded-xl shadow-lg p-6 border-4 ${
          balance >= 0 
            ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-400' 
            : 'bg-gradient-to-r from-red-50 to-red-100 border-red-400'
        }`}>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Final Balance</p>
            <p className={`text-4xl font-bold ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(balance)}
            </p>
            <p className={`text-sm mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {balance >= 0 
                ? 'You have money remaining!' 
                : 'You are over budget!'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryCards;

