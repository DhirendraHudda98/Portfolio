import express from 'express';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// Home data
router.get('/home', async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true }).limit(3);
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.json({ featuredProjects, recentBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load home page' });
  }
});

// About data
router.get('/about', async (req, res) => {
  try {
    const skills = await Skill.find();
    const about = {
      name: 'Dhirendra Hudda',
      title: 'Full Stack Web Developer',
      bio: 'I am a passionate full-stack developer with expertise in modern web technologies. I love building beautiful, functional, and user-friendly applications.',
      email: 'dhirendrahudda@gmail.com',
      phone: '+91 9799279475',
      location: 'Jodhpur, Rajasthan',
      github: 'https://github.com/dhirendrahudda',
      linkedin: 'https://linkedin.com/in/dhirendrahudda',
      twitter: 'https://twitter.com/dhirendrahudda'
    };
    res.json({ about, skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load about page' });
  }
});

export default router;
