import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  lecturer: { type: String, required: true },
  weight: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);