import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
} from '../controllers/transactionController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

const transactionValidation = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title must be at least 1 character long'),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either income or expense'),
  body('category')
    .isIn(['Food', 'Transport', 'Leisure', 'Bills', 'Health', 'Others'])
    .withMessage('Invalid category'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('description')
    .optional()
    .trim()
];

// Routes
router.get('/summary', getSummary);
router.get('/', getTransactions);
router.post('/', transactionValidation, createTransaction);
router.put('/:id', transactionValidation, updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;

