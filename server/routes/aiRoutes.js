import express from 'express';
import chatWithAI from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // Ensure the user is authenticated

router.post('/chat', chatWithAI);

export default router;