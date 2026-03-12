import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { ProfileSkeleton } from '../components/LoadingSkeleton'
import ScrollReveal from '../components/ScrollReveal'
import TextReveal from '../components/TextReveal'
import { useInView } from '../hooks/useAnimations'

const timeline = [
  { type: 'education', title: 'B.Tech in Computer Science & Engineering (3rd Year)', org: 'Lovely Professional University (LPU), Punjab', period: '2023 - Present', description: 'Currently pursuing 3rd year B.Tech in CSE. Building full-stack web applications and working on projects like CampusArena and BikeHub.' },
  { type: 'education', title: '12th (Senior Secondary)', org: 'Kendriya Vidyalaya BSF, Jodhpur', period: '2022', description: 'Completed 12th standard with 70%.' },
  { type: 'education', title: '10th (Secondary)', org: 'Kendriya Vidyalaya BSF, Jodhpur', period: '2020', description: 'Completed 10th standard with 86%.' },
]

export default function About() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [skillsRef, skillsVisible] = useInView({ threshold: 0.2 })

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
            <div ref={skillsRef}>
              <TextReveal className="text-3xl font-bold mb-8" as="h2">
                Skills & Expertise
              </TextReveal>
              <div className="space-y-8">
                {skills && skills.length > 0 ? skills.map(group => (
                  <div key={group._id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition border-glow">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">{group.category}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {group.skills.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-xs text-slate-400">{skill.proficiency}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: skillsVisible ? (proficiencyWidth[skill.proficiency] || '60%') : '0%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-slate-400"><p>Skills coming soon...</p></div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Experience & Education Timeline */}
          <ScrollReveal delay={400}>
            <div className="mt-12">
              <TextReveal className="text-3xl font-bold mb-8" as="h2">
                Experience & Education
              </TextReveal>
              <div className="relative border-l-2 border-blue-500/30 ml-4 space-y-8 stagger-children visible">
                {timeline.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 200} direction="left">
                    <div className="relative pl-8">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-950 glow-pulse"></div>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{item.type === 'work' ? '💼' : '🎓'}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {item.period}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                        <p className="text-blue-400 text-sm font-semibold">{item.org}</p>
                        <p className="text-slate-400 text-sm mt-2">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
