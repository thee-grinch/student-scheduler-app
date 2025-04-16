import express from 'express';
import { getCourses, addCourse, deleteCourse } from '../controllers/courseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getCourses)
  .post(addCourse);

router.route('/:id')
  .delete(deleteCourse);

export default router;