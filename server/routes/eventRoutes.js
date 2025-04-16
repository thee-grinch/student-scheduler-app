import express from 'express';
import { getEvents, addEvent, deleteEvent } from '../controllers/eventController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getEvents)
  .post(addEvent);

router.route('/:id')
  .delete(deleteEvent);

export default router;