import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CardSkeleton } from '../components/LoadingSkeleton'
import TiltCard from '../components/TiltCard'
import ScrollReveal from '../components/ScrollReveal'
import TextReveal from '../components/TextReveal'
import GlowCard from '../components/GlowCard'

const techIcons = {
  JavaScript: '📜', 'Node.js': '🟢', Express: '⚡', React: '⚛️',
  MongoDB: '🍃', HTML: '🏗️', CSS: '🎨', Tailwind: '💨',
  Python: '🐍', Django: '🦾', SQL: '💾', PostgreSQL: '🐘',
  Vue: '💚', 'Vue.js': '💚', Angular: '🔴', TypeScript: '📘',
  'REST API': '🔌', GraphQL: '📊', Docker: '🐳', AWS: '☁️',
  Firebase: '🔥', 'Chart.js': '📊', API: '🔌', 'Tailwind CSS': '💨',
  Stripe: '💳', WebSocket: '🔗', TensorFlow: '🧠', 'D3.js': '📈',
  'Socket.io': '🔗',
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadProjects = () => {
    setLoading(true)
    setError(false)
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects')
        return res.json()
      })
      .then(d => { setProjects(d); setLoading(false) })
      .catch((err) => { console.error('Projects fetch error:', err); setError(true); setLoading(false) })
  }

  useEffect(() => { loadProjects() }, [])

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <SEO title="Projects" />
      <div className="h-12 bg-slate-800 rounded w-1/3 mb-4 animate-pulse" />
      <div className="h-6 bg-slate-800 rounded w-2/3 mb-12 animate-pulse" />
      <CardSkeleton count={3} />
    </div>
  )

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <SEO title="Projects" />
      <div className="text-center py-20">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold mb-3">Could not load projects</h2>
        <p className="text-slate-400 mb-6">Make sure the backend server is running on port 5000.</p>
        <button onClick={loadProjects} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold ripple-btn">
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 relative">
      {/* Parallax floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] right-[8%] w-3 h-3 bg-blue-400/20 rounded-full float-slow"></div>
        <div className="absolute top-[40%] left-[3%] w-2 h-2 bg-cyan-400/25 rounded-full float-medium" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-[15%] right-[15%] w-4 h-4 bg-purple-400/15 rounded-full float-slow" style={{ animationDelay: '-4s' }}></div>
      </div>
      <SEO title="Projects" description="Browse my portfolio projects — CampusArena, BikeHub, and more." />
      <ScrollReveal>
        <TextReveal className="text-5xl font-bold mb-4" as="h1">
          My Projects
        </TextReveal>
        <p className="text-slate-400 mb-12 text-lg">A collection of projects showcasing my skills in full-stack development</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.length > 0 ? projects.map((project, i) => (
          <ScrollReveal key={project._id} delay={i * 150}>
            <GlowCard>
              <TiltCard className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 gradient-border card-shine h-full" intensity={5}>
                <div className="h-56 bg-linear-to-br from-slate-800 to-slate-900 overflow-hidden relative img-reveal">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  {project.galleryImages && project.galleryImages.length > 0 && (
                    <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-lg">
                      +{project.galleryImages.length} photos
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-2 flex items-end justify-center pb-4">
                    <Link to={`/projects/${project._id}`} className="px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-lg text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details →
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <Link to={`/projects/${project._id}`} className="text-xl font-bold mb-2 group-hover:text-blue-400 transition block gradient-text-hover">
                    {project.title}
                  </Link>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6 stagger-children visible">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20 flex items-center gap-1 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300">
                        <span>{techIcons[tech] || '⚙️'}</span> {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium ripple-btn shadow-lg shadow-blue-500/20">
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </GlowCard>
          </ScrollReveal>
        )) : (
          <div className="col-span-full text-center py-20 text-slate-400">
            <p className="text-lg">No projects found. Start building!</p>
          </div>
        )}
      </div>
    </div>
  )
}
