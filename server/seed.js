// server/seed.js
import User from './models/User.js';
import Task from './models/Task.js';
import mongoose from 'mongoose';

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const user = await User.create({
    name: 'Test User',
    email: 'test@studentscheduler.com',
    password: 'password123'
  });

  await Task.create([
    { user: user._id, title: 'Math Homework', subject: 'Mathematics', dueDate: new Date().setDate(new Date().getDate() + 2) },
    { user: user._id, title: 'History Essay', subject: 'History', dueDate: new Date().setDate(new Date().getDate() + 5) }
  ]);

  console.log('Database seeded!');
  process.exit();
};

seed();