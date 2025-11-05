import Transaction from '../models/Transaction.js';
import { validationResult } from 'express-validator';

const DEFAULT_CATEGORIES = ['Food', 'Transport', 'Leisure', 'Bills', 'Health', 'Others'];

export const getTransactions = async (req, res, next) => {
  try {
    const { month, page = 1, limit = 50 } = req.query;
    const userId = req.userId;

    // Build query
    const query = { user_id: userId };

    // Filter by month if provided (format: YYYY-MM)
    if (month) {
      const [year, monthNum] = month.split('-');
      const startDate = new Date(year, parseInt(monthNum) - 1, 1);
      const endDate = new Date(year, parseInt(monthNum), 0, 23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get transactions
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count
    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: {
        transactions,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => e.msg)
      });
    }

    const userId = req.userId;
    const { title, type, category, amount, date, description } = req.body;

    const transaction = new Transaction({
      user_id: userId,
      title,
      type,
      category,
      amount,
      date: new Date(date),
      description: description || ''
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: { transaction }
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => e.msg)
      });
    }

    const { id } = req.params;
    const userId = req.userId;
    const { title, type, category, amount, date, description } = req.body;

    // Find transaction and verify ownership
    const transaction = await Transaction.findOne({ _id: id, user_id: userId });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Update transaction
    transaction.title = title;
    transaction.type = type;
    transaction.category = category;
    transaction.amount = amount;
    transaction.date = new Date(date);
    transaction.description = description || '';

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: { transaction }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find transaction and verify ownership
    const transaction = await Transaction.findOne({ _id: id, user_id: userId });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    await Transaction.deleteOne({ _id: id, user_id: userId });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const { month } = req.query;
    const userId = req.userId;

    // Build query
    const query = { user_id: userId };

    // Filter by month if provided (format: YYYY-MM)
    let startDate, endDate;
    if (month) {
      const [year, monthNum] = month.split('-');
      startDate = new Date(year, parseInt(monthNum) - 1, 1);
      endDate = new Date(year, parseInt(monthNum), 0, 23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    } else {
      // Default to current month
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    // Aggregate transactions
    const transactions = await Transaction.find(query).lean();

    // Calculate totals
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    // Initialize all categories with zero
    DEFAULT_CATEGORIES.forEach(cat => {
      categoryTotals[cat] = 0;
    });

    transactions.forEach(tx => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
      }
    });

    // Format categories array
    const categories = DEFAULT_CATEGORIES.map(category => ({
      category,
      total: categoryTotals[category] || 0
    }));

    const balance = totalIncome - totalExpense;

    // Get month string for response
    const monthString = month || `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;

    res.status(200).json({
      success: true,
      message: 'Summary retrieved successfully',
      data: {
        totalIncome,
        totalExpense,
        balance,
        categories,
        month: monthString
      }
    });
  } catch (error) {
    next(error);
  }
};

