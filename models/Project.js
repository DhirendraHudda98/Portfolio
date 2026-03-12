import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  galleryImages: [{
    url: String,
    caption: String,
    altText: String
  }],
  technologies: [String],
  githubUrl: {
    type: String,
    required: true
  },
  liveUrl: String,
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Project', projectSchema);
