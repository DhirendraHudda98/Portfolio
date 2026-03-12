import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load blog posts' });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const relatedPosts = await Blog.find({
      tags: { $in: blog.tags },
      _id: { $ne: blog._id }
    }).limit(3);
    res.json({ blog, relatedPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load blog post' });
  }
});

export default router;
