
import mongoose from 'mongoose';

const villaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.models.Villa || mongoose.model('Villa', villaSchema);
