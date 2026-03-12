# Express Portfolio Builder

A beautiful, fully-functional full-stack developer portfolio built with **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**. Featuring smooth animations, responsive design, and a modern dark aesthetic.

## Features

- **Home Page** - Hero section with featured projects and recent blog posts
- **Projects Showcase** - Display all your projects with GitHub links and live demos
- **About/Skills Section** - Professional bio, contact info, and skill proficiency levels
- **Blog** - Write and share articles about your development journey
- **Contact Form** - Get in touch with potential clients or collaborators
- **Animations** - Smooth CSS transitions, scroll reveals, and interactive elements
- **Responsive Design** - Works perfectly on all devices
- **Dark Theme** - Modern dark mode UI with blue and cyan accents

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local setup)
- **Templating**: EJS
- **Styling**: Tailwind CSS + Custom CSS animations
- **Frontend**: Vanilla JavaScript with smooth interactions

## Project Structure

```
portfolio-app/
├── models/              # MongoDB schemas
│   ├── Project.js
│   ├── Blog.js
│   ├── Skill.js
│   └── Contact.js
├── routes/              # Express route handlers
│   ├── homeRoutes.js
│   ├── projectRoutes.js
│   ├── blogRoutes.js
│   └── contactRoutes.js
├── views/               # EJS templates
│   ├── layout.ejs
│   ├── index.ejs
│   ├── projects.ejs
│   ├── about.ejs
│   ├── blog.ejs
│   ├── blog-post.ejs
│   ├── contact.ejs
│   ├── 404.ejs
│   └── error.ejs
├── public/
│   ├── css/
│   │   └── styles.css   # Custom animations & styles
│   └── js/
│       └── script.js    # Interactive features
├── scripts/
│   └── seed.js          # Database seeder
├── server.js            # Express app entry point
├── package.json
├── .env
└── .gitignore
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or pnpm

### Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 2: Configure Environment Variables

The `.env` file is already created with default values:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=3000
NODE_ENV=development
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using MongoDB locally
mongod
```

Or use MongoDB Atlas cloud (update MONGODB_URI in .env):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Step 4: Seed Sample Data (Optional)

Populate the database with sample projects, blog posts, and skills:
```bash
node scripts/seed.js
```

### Step 5: Start the Server

```bash
npm run dev
# or for production
npm start
```

Visit `http://localhost:3000` in your browser.

## Customization Guide

### Update Personal Information

Edit `/views/homeRoutes.js` to update your details:
```javascript
const about = {
  name: 'Your Full Name',
  title: 'Full Stack Web Developer',
  bio: 'Your bio here...',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'City, Country',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  cv: '/files/your-cv.pdf'
};
```

### Add New Projects

Use the MongoDB connection to insert projects directly:
```javascript
await Project.create({
  title: 'Your Project',
  description: 'Description...',
  technologies: ['Tech1', 'Tech2'],
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...',
  featured: true
});
```

Or modify `scripts/seed.js` and re-run it.

### Add Blog Posts

Similarly, create new blog posts:
```javascript
await Blog.create({
  title: 'Article Title',
  slug: 'article-slug',
  excerpt: 'Short excerpt...',
  content: 'Full content here...',
  tags: ['tag1', 'tag2'],
  author: 'Your Name'
});
```

### Customize Colors & Theme

Edit `/public/css/styles.css` to change colors:
- Primary: `#60a5fa` (blue-400)
- Secondary: `#06b6d4` (cyan-400)
- Background: `#0f172a` (slate-950)

Or modify the Tailwind color classes in EJS templates.

## Animations Included

- **Fade In**: Smooth opacity transitions
- **Slide Up**: Elements sliding up from bottom
- **Slide Down/Left/Right**: Directional slide animations
- **Blob Animation**: Animated gradient blobs in hero
- **Card Hover**: Lift effect on project/blog cards
- **Skill Bars**: Animated bar fill on scroll
- **Scroll Reveals**: Elements animating as they come into view
- **Parallax**: Subtle parallax effects on scroll

## API Endpoints

### Projects
- `GET /projects` - View all projects
- `GET /projects/api` - JSON API for projects
- `GET /projects/:id` - Single project details

### Blog
- `GET /blog` - View all blog posts
- `GET /blog/:slug` - Single blog post
- `GET /blog/api/all` - JSON API for blogs

### Contact
- `GET /contact` - Contact form page
- `POST /contact` - Submit contact form

### Other
- `GET /` - Home page
- `GET /about` - About & skills page
- `GET /download-cv` - Download CV

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Heroku
```bash
heroku login
heroku create your-portfolio
heroku config:set MONGODB_URI=your_mongo_url
git push heroku main
```

### Deploy to Railway/Render
Follow platform-specific guides to connect your GitHub repository.

## Performance Tips

- Use MongoDB Atlas for cloud hosting
- Enable gzip compression in Express
- Optimize images before uploading
- Consider using a CDN for static assets
- Implement caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this for your portfolio!

## Support & Questions

For issues or questions:
1. Check MongoDB connection
2. Verify all environment variables
3. Ensure Node.js version compatibility
4. Check browser console for errors

---

Built with care for developers by developers! Happy coding! 🚀
