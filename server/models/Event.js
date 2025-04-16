import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // New field for time
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);