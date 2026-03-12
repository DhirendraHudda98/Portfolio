import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TypingAnimation from '../components/TypingAnimation'
import SEO from '../components/SEO'
import { CardSkeleton, HeroSkeleton } from '../components/LoadingSkeleton'
import ParticleBackground from '../components/ParticleBackground'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'
import TextReveal from '../components/TextReveal'
import GlowCard from '../components/GlowCard'
import Marquee from '../components/Marquee'
import ScrollIndicator from '../components/ScrollIndicator'
import ShaderBackground from '../components/ShaderBackground'

export default function Home() {
  const [data, setData] = useState({ featuredProjects: [], skills: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = () => {
    setLoading(true)
    setError(false)
    Promise.all([
      fetch('/api/home').then(r => {
        if (!r.ok) throw new Error('Failed to load home data')
        return r.json()
      }),
      fetch('/api/about').then(r => {
        if (!r.ok) throw new Error('Failed to load about data')
        return r.json()
      })
    ])
      .then(([home, about]) => {
        setData({ featuredProjects: home.featuredProjects || [], skills: about.skills || [] })
        setLoading(false)
      })
      .catch((err) => {
        console.error('Home data fetch error:', err)
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => { loadData() }, [])

  if (loading) return (
    <>
      <SEO />
      <div className="relative overflow-hidden">
        <HeroSkeleton />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="h-10 bg-slate-800 rounded w-1/3 mb-12 animate-pulse" />
        <CardSkeleton count={3} />
      </div>
    </>
  )

  if (error) return (
    <>
      <SEO title="Home" />
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold mb-3">Could not load data</h2>
          <p className="text-slate-400 mb-6">Make sure the backend server is running on port 5000.</p>
          <button onClick={loadData} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold ripple-btn">
            Retry
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <SEO title="Home" description="Dhirendra Hudda — Full Stack Developer. View my projects, skills, and get in touch." />

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh] flex items-center">
        <ShaderBackground />
        <ParticleBackground />
        {/* Lightweight floating dots (GPU-accelerated with will-change) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-400/20 rounded-full float-slow will-change-transform"></div>
          <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 bg-cyan-400/25 rounded-full float-medium will-change-transform" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute top-[60%] left-[20%] w-2 h-2 bg-purple-400/15 rounded-full float-slow will-change-transform" style={{ animationDelay: '-4s' }}></div>
          <div className="absolute bottom-[15%] left-[40%] w-1.5 h-1.5 bg-cyan-300/20 rounded-full float-medium will-change-transform" style={{ animationDelay: '-6s' }}></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center z-10">
          <div className="relative inline-block pulse-ring mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 overflow-hidden glow-pulse animate-fadeIn">
              <img src="/profile.png" alt="Dhirendra Hudda" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 shimmer-text min-h-[1.2em]">
            <TypingAnimation words={['Full Stack Developer', 'MERN Stack Developer', 'Web Developer', 'Software Engineer']} speed={80} pause={2500} />
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto animate-slideUp">
            Building beautiful, scalable web applications with modern technologies
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-slideUp animation-delay-200">
            <MagneticButton className="inline-block">
              <Link to="/projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition transform hover:scale-105 inline-block ripple-btn font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                View Projects
              </Link>
            </MagneticButton>
            <MagneticButton className="inline-block">
              <Link to="/contact" className="px-8 py-3 border border-blue-400/50 hover:bg-blue-400/10 rounded-lg transition inline-block ripple-btn font-semibold hover:border-blue-400">
                Get in Touch
              </Link>
            </MagneticButton>
          </div>
        </div>
        <ScrollIndicator />
      </div>

      {/* Stats Counter Section */}
      <ScrollReveal>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 glass-card rounded-2xl p-8">
            <AnimatedCounter end={2} suffix="+" label="Projects Built" />
            <AnimatedCounter end={8} suffix="+" label="Technologies" />
            <AnimatedCounter end={100} suffix="%" label="Dedication" />
            <AnimatedCounter end={24} suffix="/7" label="Available" />
          </div>
        </div>
      </ScrollReveal>

      {/* Tech Stack Marquee */}
      <ScrollReveal>
        <div className="py-12">
          <p className="text-center text-sm text-slate-500 uppercase tracking-[0.2em] mb-6 font-medium">Technologies I Work With</p>
          <Marquee
            items={['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Git', 'REST API', 'Python', 'TypeScript']}
            speed={35}
          />
        </div>
      </ScrollReveal>

      {/* Skills Preview */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <TextReveal className="text-4xl font-bold mb-12 flex items-center gap-3" as="h2">
            Skills & Technologies
          </TextReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.length > 0 ? data.skills.map((group, i) => (
              <ScrollReveal key={group._id} delay={i * 120}>
                <GlowCard>
                  <TiltCard className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition border-glow card-shine h-full" intensity={8}>
                    <h3 className="text-lg font-bold mb-4 text-blue-400 neon-text">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(skill => (
                        <span key={skill.name} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </GlowCard>
              </ScrollReveal>
            )) : (
              <div className="col-span-4 text-center py-8 text-slate-400">
                <p>Skills loading...</p>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Projects */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <TextReveal className="text-4xl font-bold mb-12 flex items-center gap-3" as="h2">
            Featured Projects
          </TextReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {data.featuredProjects.length > 0 ? data.featuredProjects.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 150}>
                <GlowCard>
                  <TiltCard className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition group gradient-border card-shine" intensity={6}>
                    <div className="h-48 bg-linear-to-br from-slate-800 to-slate-900 overflow-hidden img-reveal">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-700 rounded transition text-sm ripple-btn">GitHub</a>
                    </div>
                  </div>
                  </TiltCard>
                </GlowCard>
              </ScrollReveal>
            )) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <p>No featured projects yet. Add some to your database!</p>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-600 rounded-2xl p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20">
              <div className="morph-blob absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
              <div className="morph-blob absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full" style={{ animationDelay: '-3s' }}></div>
            </div>
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to work together?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-md mx-auto">Let&apos;s create something amazing and bring your vision to life</p>
              <MagneticButton>
                <Link to="/contact" className="px-10 py-4 bg-slate-950 hover:bg-slate-900 rounded-xl transition inline-block ripple-btn font-semibold text-lg shadow-2xl shadow-black/30 hover:shadow-black/50 hover:scale-105 transform duration-300">
                  Get In Touch
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  )
}
