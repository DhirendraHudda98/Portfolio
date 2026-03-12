import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['twitter', 'github', 'linkedin', 'instagram', 'facebook', 'youtube', 'codepen', 'dribbble', 'behance', 'email']
  },
  url: {
    type: String,
    required: true
  },
  username: String,
  icon: String,
  displayOrder: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Social', socialSchema);
