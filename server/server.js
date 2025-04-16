import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { startNotificationCron } from './utils/notifier.js';
import auth from './middleware/auth.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  // origin: 'https://supreme-telegram-944jjq9xvw4cxr56-5173.app.github.dev',
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
});


// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Routes
app.use('/api/auth', authRoutes);
app.use(auth)
app.use('/api/tasks', taskRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/notes', noteRoutes);
// app.use('/api/ai', aiRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/courses', courseRoutes);

// Error Handling
app.use(errorHandler);




// Start cron jobs
startNotificationCron();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));