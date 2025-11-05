import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import SalaryCard from '../components/SalaryCard';
import PieChartCard from '../components/PieChartCard';
import SummaryCards from '../components/SummaryCards';
import CategoryList from '../components/CategoryList';
import TransactionList from '../components/TransactionList';
import FloatingAddButton from '../components/FloatingAddButton';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionDetailsModal from '../components/TransactionDetailsModal';
import EditTransactionModal from '../components/EditTransactionModal';
import CategoryDetailsModal from '../components/CategoryDetailsModal';
import { getCurrentMonth } from '../utils/format';

/**
 * DashboardPage Component
 * Main financial dashboard - single page application
 * Logic: Balance = Salary - Total Expenses (auto-calculated)
 */
const DashboardPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  const [isCategoryDetailsOpen, setIsCategoryDetailsOpen] = useState(false);
  
  const monthlySalary = summary?.totalIncome || 0;

  // Fetch summary data
  const fetchSummary = async () => {
    try {
      const response = await transactionsAPI.getSummary({ month: currentMonth });
      if (response && response.success) {
        setSummary(response.data);
      } else {
        toast.error('Erro ao carregar resumo financeiro');
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao carregar resumo financeiro');
      // Set empty summary to show something
      setSummary({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        categories: [
          { category: 'Food', total: 0 },
          { category: 'Transport', total: 0 },
          { category: 'Leisure', total: 0 },
          { category: 'Bills', total: 0 },
          { category: 'Health', total: 0 },
          { category: 'Others', total: 0 }
        ],
        month: currentMonth
      });
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const params = {
        month: currentMonth,
        page: 1,
        limit: 50
      };
      
      // Filter by category if selected
      let response = await transactionsAPI.getTransactions(params);
      
      if (response && response.success) {
        let filteredTransactions = response.data?.transactions || [];
        
        // Apply category filter if selected
        if (selectedCategory) {
          filteredTransactions = filteredTransactions.filter(
            tx => tx.category === selectedCategory
          );
        }
        
        setTransactions(filteredTransactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao carregar transações');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSummary();
    fetchTransactions();
  }, [currentMonth]);

  useEffect(() => {
    if (currentMonth) {
      fetchTransactions();
    }
  }, [selectedCategory, currentMonth]);

  const handleAddTransaction = async (data) => {
    try {
      const response = await transactionsAPI.createTransaction(data);
      if (response.success) {
        toast.success('Transaction added successfully');
        fetchSummary();
        fetchTransactions();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add transaction');
      throw error;
    }
  };

  const handleUpdateTransaction = async (id, data) => {
    try {
      const response = await transactionsAPI.updateTransaction(id, data);
      if (response.success) {
        toast.success('Transaction updated successfully');
        fetchSummary();
        fetchTransactions();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update transaction');
      throw error;
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionsAPI.deleteTransaction(id);
      toast.success('Transaction deleted successfully');
      fetchSummary();
      fetchTransactions();
    } catch (error) {
      toast.error(error.message || 'Failed to delete transaction');
    }
  };

  const handleTransactionMenuClick = (transactionId, action) => {
    const transaction = transactions.find(tx => tx._id === transactionId);
    
    if (!transaction) return;

    switch (action) {
      case 'view':
        setSelectedTransaction(transaction);
        setIsDetailsModalOpen(true);
        break;
      case 'edit':
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this transaction?')) {
          handleDeleteTransaction(transactionId);
        }
        break;
      default:
        break;
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleCategoryMenuClick = (category) => {
    setSelectedCategoryDetails(category);
    setIsCategoryDetailsOpen(true);
  };

  const handleEditFromDetails = (transaction) => {
    setIsDetailsModalOpen(false);
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteFromDetails = (id) => {
    handleDeleteTransaction(id);
    setIsDetailsModalOpen(false);
  };

  /**
   * Handle Salary Update
   * Creates/updates monthly salary as income transaction
   * Balance automatically recalculates: Salary - Expenses
   */
  const handleSalaryUpdate = async (salaryAmount) => {
    try {
      const salaryTx = transactions.find(
        tx => tx.type === 'income' && tx.title.toLowerCase().includes('salary')
      );

      const salaryData = {
        title: 'Monthly Salary',
        type: 'income',
        category: 'Others',
        amount: salaryAmount,
        date: new Date(`${currentMonth}-01`).toISOString(),
        description: 'Monthly salary income'
      };

      if (salaryTx) {
        await handleUpdateTransaction(salaryTx._id, salaryData);
      } else {
        await handleAddTransaction(salaryData);
      }
      
      // Force refresh data
      await fetchSummary();
      await fetchTransactions();
      toast.success('Salary updated successfully!');
    } catch (error) {
      toast.error('Failed to update salary');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading...</div>
          </div>
        ) : (
          <>
            <SalaryCard 
              monthlySalary={monthlySalary} 
              onSalaryUpdate={handleSalaryUpdate}
            />
            {summary ? (
              <SummaryCards
                totalIncome={summary.totalIncome}
                totalExpense={summary.totalExpense}
                balance={summary.balance}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <p className="text-gray-600">Carregando dados financeiros...</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Pie Chart */}
              <div className="lg:col-span-2 order-1">
                {summary ? (
                  <PieChartCard
                    categoriesData={summary.categories}
                    displayCenterValue={summary.totalExpense}
                    totalSalary={summary.totalIncome}
                    totalExpenses={summary.totalExpense}
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="text-gray-600">Carregando gráfico...</p>
                  </div>
                )}
              </div>

              {/* Category List */}
              <div className="lg:col-span-1 order-2">
                {summary ? (
                  <CategoryList
                    categories={summary.categories}
                    onCategoryClick={handleCategoryClick}
                    onCategoryMenuClick={handleCategoryMenuClick}
                    selectedCategory={selectedCategory}
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="text-gray-600">Carregando categorias...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction List */}
            <TransactionList
              transactions={transactions}
              onMenuClick={handleTransactionMenuClick}
            />
          </>
        )}
      </main>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        defaultDate={`${currentMonth}-01`}
      />

      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteFromDetails}
      />

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onSave={handleUpdateTransaction}
      />

      <CategoryDetailsModal
        isOpen={isCategoryDetailsOpen}
        onClose={() => {
          setIsCategoryDetailsOpen(false);
          setSelectedCategoryDetails(null);
        }}
        category={selectedCategoryDetails}
        transactions={transactions}
      />
    </div>
  );
};

export default DashboardPage;

