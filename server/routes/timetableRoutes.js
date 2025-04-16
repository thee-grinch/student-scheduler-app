import express from 'express';
import { createTimetable, getTimetable, deleteTimetableEntry } from '../controllers/timetableController.js';
// import auth from '../middleware/auth.js';

const router = express.Router();

// router.use(auth);

router.route('/')
  .post(createTimetable) // Generate timetable
  .get(getTimetable);    // Fetch timetable

router.route('/:id')
  .delete(deleteTimetableEntry); // Delete a specific timetable entry

export default router;