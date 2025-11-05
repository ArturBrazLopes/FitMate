import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/format';
import { FiDollarSign, FiEdit2 } from 'react-icons/fi';

/**
 * SalaryCard Component
 * Displays and allows editing of monthly salary (Excel Row 1 - base income)
 * Balance calculation: Salary - Total Expenses
 */
const SalaryCard = ({ monthlySalary, onSalaryUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [salaryValue, setSalaryValue] = useState(monthlySalary || '');

  useEffect(() => {
    setSalaryValue(monthlySalary || '');
  }, [monthlySalary]);

  const handleSave = () => {
    const salary = parseFloat(salaryValue);
    if (salary > 0) {
      onSalaryUpdate(salary);
      setIsEditing(false);
    }
  };

  // When editing, show input field
  if (isEditing) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md p-6 mb-6 border-2 border-green-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Salary
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-700">$</span>
              <input
                type="number"
                value={salaryValue}
                onChange={(e) => setSalaryValue(e.target.value)}
                placeholder="Enter monthly salary"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xl font-bold"
                autoFocus
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setSalaryValue(monthlySalary || '');
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display mode - show salary with edit button
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md p-6 mb-6 border-2 border-green-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-green-200 p-3 rounded-full">
            <FiDollarSign className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Salary</p>
            <p className="text-3xl font-bold text-green-700">
              {monthlySalary ? formatCurrency(monthlySalary) : 'Not set'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          <span>{monthlySalary ? 'Edit' : 'Set Salary'}</span>
        </button>
      </div>
      {monthlySalary && (
        <p className="text-xs text-gray-500 mt-2">
          This is your base income. Expenses will be subtracted from this amount.
        </p>
      )}
    </div>
  );
};

export default SalaryCard;

