import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  image: {
    type: String,
    default: 'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png',
  },
  phoneNumber: {
    type: String,
  },
  nationality: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
