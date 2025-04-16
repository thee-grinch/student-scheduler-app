import express from 'express';
import { getAssignments, addAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getAssignments)
  .post(addAssignment);

router.route('/:id')
  .put(updateAssignment)
  .delete(deleteAssignment);

export default router;