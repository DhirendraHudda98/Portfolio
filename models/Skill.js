import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  skills: [
    {
      name: String,
      proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
      }
    }
  ]
});

export default mongoose.model('Skill', skillSchema);
