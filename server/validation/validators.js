import { body } from 'express-validator';

export const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
];

export const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().withMessage('Invalid date format'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').isIn(['todo', 'in-progress', 'completed']).withMessage('Invalid status')
];