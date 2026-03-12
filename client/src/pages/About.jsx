import { useState, useEffect, useRef } from 'react'
import SEO from '../components/SEO'
import { ProfileSkeleton } from '../components/LoadingSkeleton'
import ScrollReveal from '../components/ScrollReveal'
import TextReveal from '../components/TextReveal'
import { useInView } from '../hooks/useAnimations'

function AnimatedSkillBar({ name, proficiency, width, visible, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium transition-colors duration-300 ${hovered ? 'text-blue-400' : ''}`}>{name}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} ${hovered ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400'}`}
          style={{ transitionDelay: `${delay + 300}ms` }}>
          {proficiency}
        </span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ease-out relative overflow-hidden ${hovered ? 'shadow-[0_0_12px_rgba(96,165,250,0.5)]' : ''}`}
          style={{
            width: visible ? width : '0%',
            transitionDuration: '1.2s',
            transitionDelay: `${delay}ms`,
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)',
            backgroundSize: '200% 100%',
            animation: visible ? 'shimmerBar 2s ease-in-out infinite' : 'none',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ animation: visible ? 'skillShine 2s ease-in-out infinite' : 'none', animationDelay: `${delay + 1200}ms` }} />
        </div>
      </div>
    </div>
  )
}

function SkillGroup({ group, index, proficiencyWidth }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 })
  return (
    <div ref={ref} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(96,165,250,0.1)] transition-all duration-500">
      <h3 className="text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{group.category}</h3>
      <div className="grid md:grid-cols-2 gap-5">
        {group.skills.map((skill, si) => (
          <AnimatedSkillBar
            key={skill.name}
            name={skill.name}
            proficiency={skill.proficiency}
            width={proficiencyWidth[skill.proficiency] || '60%'}
            visible={isVisible}
            delay={si * 100}
          />
        ))}
      </div>
    </div>
  )
}

function AnimatedTimelineItem({ item, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.3 })
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} className="relative pl-8">
      {/* Animated dot */}
      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-950 transition-all duration-700 ${isVisible ? 'bg-blue-500 scale-100' : 'bg-slate-700 scale-0'}`}
        style={{ transitionDelay: `${index * 150}ms` }}>
        <div className={`absolute inset-0 rounded-full bg-blue-400 transition-opacity duration-1000 ${isVisible ? 'animate-ping opacity-75' : 'opacity-0'}`}
          style={{ animationIterationCount: 2, animationDelay: `${index * 150}ms` }} />
      </div>

      {/* Card */}
      <div
        className={`bg-slate-900 border rounded-lg p-6 transition-all duration-700 cursor-default ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} ${hovered ? 'border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.15)] scale-[1.02]' : 'border-slate-800'}`}
        style={{ transitionDelay: `${index * 200}ms` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-lg transition-transform duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-45'} ${hovered ? 'animate-bounce' : ''}`}
            style={{ transitionDelay: `${index * 200 + 300}ms` }}>
            🎓
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            style={{ transitionDelay: `${index * 200 + 200}ms` }}>
            {item.period}
          </span>
        </div>
        <h3 className={`text-xl font-bold mt-2 transition-all duration-500 ${hovered ? 'text-blue-400' : ''}`}>{item.title}</h3>
        <p className="text-blue-400 text-sm font-semibold">{item.org}</p>
        <p className={`text-slate-400 text-sm mt-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ transitionDelay: `${index * 200 + 400}ms` }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

const timeline = [
  { type: 'education', title: 'B.Tech in Computer Science & Engineering (3rd Year)', org: 'Lovely Professional University (LPU), Punjab', period: '2023 - Present', description: 'Currently pursuing 3rd year B.Tech in CSE. Building full-stack web applications and working on projects like CampusArena and BikeHub.' },
  { type: 'education', title: '12th (Senior Secondary)', org: 'Kendriya Vidyalaya BSF, Jodhpur', period: '2022', description: 'Completed 12th standard with 70%.' },
  { type: 'education', title: '10th (Secondary)', org: 'Kendriya Vidyalaya BSF, Jodhpur', period: '2020', description: 'Completed 10th standard with 86%.' },
]

function CertificateCard({ cert, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      className={`bg-slate-900 border rounded-lg p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 border-slate-800' : 'opacity-0 translate-y-6 border-transparent'} hover:border-blue-500 hover:shadow-[0_0_20px_rgba(96,165,250,0.1)] group`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`text-3xl transition-transform duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}
          style={{ transitionDelay: `${index * 150 + 200}ms` }}>
          🏆
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{cert.title}</h3>
          <p className="text-blue-400 text-sm font-semibold mt-1">{cert.issuer}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              📅 {cert.date}
            </span>
            {cert.credentialId && (
              <span className="text-xs text-slate-500 font-mono">
                ID: {cert.credentialId}
              </span>
            )}
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              🔗 Verify Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const certificates = [
  {
    title: 'Build & Deploy Apps with Google AI Studio & Multilingual AI Speech App with Vibe Coding',
    issuer: 'GUVI | HCL (Google for Education Partner)',
    date: 'March 11, 2026',
    credentialId: 'v315Du2Hw971790866',
    verifyUrl: 'https://www.guvi.in/certificate?id=v315Du2Hw971790866',
  },
]

export default function About() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <SEO title="About" />
      <ProfileSkeleton />
    </div>
  )
  if (!data) return <div className="text-center py-20 text-slate-400">Failed to load.</div>

  const { about, skills } = data

  const proficiencyWidth = {
    Expert: '95%',
    Advanced: '80%',
    Intermediate: '60%',
    Beginner: '40%',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 relative">
      {/* Parallax floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] right-[5%] w-3 h-3 bg-blue-400/20 rounded-full float-slow"></div>
        <div className="absolute top-[30%] left-[2%] w-2 h-2 bg-cyan-400/25 rounded-full float-medium" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-purple-400/15 rounded-full float-slow" style={{ animationDelay: '-5s' }}></div>
      </div>
      <SEO title="About" description="Learn more about Dhirendra Hudda — skills, experience, and education." />
      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Left Column */}
        <ScrollReveal direction="left">
          <div className="md:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 sticky top-28">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-blue-400 pulse-ring glow-pulse">
                  <img src="/profile.png" alt="Dhirendra Hudda" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-bold">{about.name}</h1>
                <p className="text-blue-400 font-semibold">{about.title}</p>
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b border-slate-700 stagger-children visible">
                <a href={`mailto:${about.email}`} className="flex items-center gap-3 hover:text-blue-400 transition">
                  <span>📧</span><span className="text-sm break-all">{about.email}</span>
                </a>
                <a href={`tel:${about.phone}`} className="flex items-center gap-3 hover:text-blue-400 transition">
                  <span>📱</span><span className="text-sm">{about.phone}</span>
                </a>
                <div className="flex items-center gap-3">
                  <span>📍</span><span className="text-sm">{about.location}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {about.github && (
                  <a href={about.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition group">
                    <span className="text-lg group-hover:scale-125 transition">🐙</span><span className="text-sm">GitHub</span>
                  </a>
                )}
                {about.linkedin && (
                  <a href={about.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition group">
                    <span className="text-lg group-hover:scale-125 transition">💼</span><span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {about.twitter && (
                  <a href={about.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition group">
                    <span className="text-lg group-hover:scale-125 transition">𝕏</span><span className="text-sm">Twitter/X</span>
                  </a>
                )}
              </div>

              <a href="/api/cv/download" className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold ripple-btn">
                📄 Download CV
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column */}
        <div className="md:col-span-2">
          <ScrollReveal>
            <div className="mb-12">
              <TextReveal className="text-3xl font-bold mb-6" as="h2">
                About Me
              </TextReveal>
              <p className="text-slate-300 leading-relaxed text-lg mb-4">{about.bio}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <TextReveal className="text-3xl font-bold mb-8" as="h2">
                Skills & Expertise
              </TextReveal>
              <div className="space-y-8">
                {skills && skills.length > 0 ? skills.map((group, gi) => (
                  <SkillGroup
                    key={group._id}
                    group={group}
                    index={gi}
                    proficiencyWidth={proficiencyWidth}
                  />
                )) : (
                  <div className="text-center py-8 text-slate-400"><p>Skills coming soon...</p></div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Education Timeline */}
          <ScrollReveal delay={400}>
            <div className="mt-12">
              <TextReveal className="text-3xl font-bold mb-8" as="h2">
                Education
              </TextReveal>
              <div className="relative ml-4 space-y-8">
                {/* Animated timeline line */}
                <div className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 transition-all duration-[2s] ease-out"
                  style={{ height: '100%', opacity: 0.4 }} />
                {timeline.map((item, i) => (
                  <AnimatedTimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certificates & Achievements */}
          <ScrollReveal delay={500}>
            <div className="mt-12">
              <TextReveal className="text-3xl font-bold mb-8" as="h2">
                Certificates & Achievements
              </TextReveal>
              <div className="space-y-6">
                {certificates.map((cert, i) => (
                  <CertificateCard key={i} cert={cert} index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
