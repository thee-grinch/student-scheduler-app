import { body } from 'express-validator';

export const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().withMessage('Invalid date format'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
];