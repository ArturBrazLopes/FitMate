import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { formatCurrency } from '../utils/format';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * PieChartCard Component
 * Displays expense distribution by category with total in center
 * Updates automatically when expenses change
 */

const CATEGORY_COLORS = {
  Food: '#10B981',
  Transport: '#3B82F6',
  Leisure: '#8B5CF6',
  Bills: '#F59E0B',
  Health: '#EF4444',
  Others: '#6B7280'
};

const PieChartCard = ({ categoriesData, displayCenterValue, totalSalary, totalExpenses }) => {
  // Filter out categories with zero values
  const nonZeroCategories = categoriesData.filter(cat => cat.total > 0);
  
  // Prepare chart data: Salary + Expenses
  const chartLabels = [];
  const chartData = [];
  const chartColors = [];
  
  // Add salary as first item if exists
  if (totalSalary > 0) {
    chartLabels.push('Salary');
    chartData.push(totalSalary);
    chartColors.push('#10B981'); // Green for salary
  }
  
  // Add expenses by category
  nonZeroCategories.forEach(cat => {
    chartLabels.push(cat.category);
    chartData.push(cat.total);
    chartColors.push(CATEGORY_COLORS[cat.category]);
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColors,
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = formatCurrency(context.parsed);
            return `${label}: ${value}`;
          }
        }
      }
    },
    cutout: '70%'
  };

  const hasData = chartData.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Financial Overview</h2>
      <div className="relative flex items-center justify-center" style={{ minHeight: '300px' }}>
        {hasData ? (
          <>
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {totalSalary > 0 ? (
                  <>
                    <div className="text-3xl font-bold text-gray-800">
                      {formatCurrency(totalSalary)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Total Salary</div>
                    {totalExpenses > 0 && (
                      <>
                        <div className="text-xl font-semibold text-red-600 mt-3">
                          - {formatCurrency(totalExpenses)}
                        </div>
                        <div className="text-xs text-gray-500">Total Expenses</div>
                        <div className={`text-2xl font-bold mt-3 ${
                          (totalSalary - totalExpenses) >= 0 ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(totalSalary - totalExpenses)}
                        </div>
                        <div className="text-xs text-gray-500">Final Balance</div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatCurrency(totalExpenses || 0)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Total Expenses</div>
                    <p className="text-xs text-gray-400 mt-3">Set salary to see balance</p>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No data this month</p>
            <p className="text-sm mt-2">Set salary and add transactions to see the chart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChartCard;

