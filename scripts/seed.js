import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import Skill from '../models/Skill.js';
import Social from '../models/Social.js';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');

// Sample projects data with gallery
const projectsData = [
  {
    title: 'CampusArena',
    description: 'A campus-focused platform for coding challenges, collaboration, and competitive programming among students.',
    imageUrl: 'https://via.placeholder.com/400x300?text=CampusArena',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    galleryImages: [],
    githubUrl: 'https://github.com/DhirendraHudda98/CampusCode',
    featured: true
  },
  {
    title: 'BikeHub',
    description: 'A bike rental and management platform for browsing, booking, and managing bike services.',
    imageUrl: 'https://via.placeholder.com/400x300?text=BikeHub',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    galleryImages: [],
    githubUrl: 'https://github.com/DhirendraHudda98/BikeHub',
    featured: true
  }
];

// Sample blog posts data
const blogData = [
  {
    title: 'Building Scalable Applications with Node.js',
    slug: 'building-scalable-nodejs-apps',
    excerpt: 'Learn the best practices for building scalable applications with Node.js and Express.',
    content: `<h2>Introduction</h2>
    <p>Node.js has become one of the most popular choices for building scalable server-side applications. In this article, we'll explore the key principles and best practices for building scalable applications.</p>
    
    <h2>Key Principles</h2>
    <p>Building scalable applications requires careful planning and architecture. Here are some key principles to keep in mind...</p>
    
    <h2>Best Practices</h2>
    <ul>
      <li>Use clustering to leverage multi-core systems</li>
      <li>Implement caching strategies</li>
      <li>Use load balancing</li>
      <li>Optimize database queries</li>
      <li>Monitor performance metrics</li>
    </ul>`,
    tags: ['Node.js', 'Backend', 'Scalability'],
    author: 'Dhirendra Hudda',
    imageUrl: 'https://via.placeholder.com/800x400?text=Node.js',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'React Hooks: A Complete Guide',
    slug: 'react-hooks-complete-guide',
    excerpt: 'Master React Hooks and understand how to use them effectively in your projects.',
    content: `<h2>What are React Hooks?</h2>
    <p>React Hooks are functions that let you use state and other React features in functional components.</p>
    
    <h2>Common Hooks</h2>
    <ul>
      <li>useState - Manage component state</li>
      <li>useEffect - Handle side effects</li>
      <li>useContext - Access context values</li>
      <li>useReducer - Complex state management</li>
      <li>useCallback - Optimize performance</li>
    </ul>`,
    tags: ['React', 'Frontend', 'JavaScript'],
    author: 'Dhirendra Hudda',
    imageUrl: 'https://via.placeholder.com/800x400?text=React+Hooks',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    slug: 'css-grid-vs-flexbox',
    excerpt: 'Understand the differences between CSS Grid and Flexbox and when to use each one.',
    content: `<h2>Flexbox Basics</h2>
    <p>Flexbox is perfect for one-dimensional layouts, either rows or columns.</p>
    
    <h2>CSS Grid Basics</h2>
    <p>CSS Grid is ideal for two-dimensional layouts where you need to control both rows and columns.</p>
    
    <h2>Conclusion</h2>
    <p>Both are powerful tools. Use Flexbox for simpler layouts and Grid for complex two-dimensional designs.</p>`,
    tags: ['CSS', 'Frontend', 'Design'],
    author: 'Dhirendra Hudda',
    imageUrl: 'https://via.placeholder.com/800x400?text=CSS+Layout',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  }
];

// Sample skills data
const skillsData = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'HTML & CSS', proficiency: 'Expert' },
      { name: 'JavaScript', proficiency: 'Expert' },
      { name: 'React', proficiency: 'Advanced' },
      { name: 'Tailwind CSS', proficiency: 'Expert' }
    ]
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', proficiency: 'Advanced' },
      { name: 'Express.js', proficiency: 'Advanced' },
      { name: 'Python', proficiency: 'Beginner' },
      { name: 'RESTful APIs', proficiency: 'Expert' },
      { name: 'Authentication', proficiency: 'Advanced' }
    ]
  },
  {
    category: 'Database & Tools',
    skills: [
      { name: 'MongoDB', proficiency: 'Advanced' },
      { name: 'PostgreSQL', proficiency: 'Beginner' },
      { name: 'Git', proficiency: 'Expert' },
      { name: 'Docker', proficiency: 'Beginner' },
      { name: 'AWS', proficiency: 'Beginner' }
    ]
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', proficiency: 'Advanced' },
      { name: 'Time Management', proficiency: 'Advanced' },
      { name: 'Leadership', proficiency: 'Intermediate' },
      { name: 'Adaptability', proficiency: 'Advanced' }
    ]
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Skill.deleteMany({});
    await Social.deleteMany({});

    // Insert sample data
    await Project.insertMany(projectsData);
    console.log('✅ Projects seeded successfully');

    await Blog.insertMany(blogData);
    console.log('✅ Blog posts seeded successfully');

    await Skill.insertMany(skillsData);
    console.log('✅ Skills seeded successfully');

    // Seed social media links
    const socialData = [
      {
        platform: 'github',
        url: 'https://github.com/dhirendrahudda',
        username: 'dhirendrahudda',
        icon: '🐙',
        displayOrder: 1,
        active: true
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/dhirendrahudda',
        username: 'dhirendrahudda',
        icon: '💼',
        displayOrder: 2,
        active: true
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/dhirendrahudda',
        username: 'dhirendrahudda',
        icon: '𝕏',
        displayOrder: 3,
        active: true
      },
      {
        platform: 'email',
        url: 'mailto:dhirendrahudda@gmail.com',
        username: 'dhirendrahudda@gmail.com',
        icon: '📧',
        displayOrder: 4,
        active: true
      }
    ];

    await Social.insertMany(socialData);
    console.log('✅ Social media links seeded successfully');

    console.log('🌱 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
