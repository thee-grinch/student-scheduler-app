import express from 'express';
import multer from 'multer';
import { uploadNote, downloadNote, getNotes } from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Save files to 'uploads/' directory

router.use(auth);

router.route('/')
  .post(upload.single('file'), uploadNote) // Upload note
  .get(getNotes);                         // Fetch all notes

router.route('/:id')
  .get(downloadNote); // Download a specific note

export default router;