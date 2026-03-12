import { useState } from 'react'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import TextReveal from '../components/TextReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()

      if (result.success) {
        setStatus({ type: 'success', message: result.message })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: result.message })
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 relative">
      {/* Parallax floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-3 h-3 bg-blue-400/20 rounded-full float-slow"></div>
        <div className="absolute top-[50%] left-[3%] w-2 h-2 bg-cyan-400/25 rounded-full float-medium" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-[10%] right-[20%] w-4 h-4 bg-purple-400/15 rounded-full float-slow" style={{ animationDelay: '-5s' }}></div>
      </div>
      <SEO title="Contact" description="Get in touch with Dhirendra Hudda for collaborations, projects, or inquiries." />
      <ScrollReveal>
        <TextReveal className="text-5xl font-bold mb-4" as="h1">
          Get In Touch
        </TextReveal>
        <p className="text-slate-400 mb-12 text-lg">Have a question or want to work together? I&apos;d love to hear from you!</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-12">
        <ScrollReveal className="md:col-span-2" delay={100}>
          <form onSubmit={handleSubmit} className="space-y-6 glass-card rounded-2xl p-8">
            <div className="floating-label-group">
              <input type="text" id="name" name="name" required value={form.name} onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-100 focus:ring-2 focus:ring-blue-500/20"
                placeholder=" " />
              <label htmlFor="name" className="font-semibold">Full Name</label>
            </div>
            <div className="floating-label-group">
              <input type="email" id="email" name="email" required value={form.email} onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-100 focus:ring-2 focus:ring-blue-500/20"
                placeholder=" " />
              <label htmlFor="email" className="font-semibold">Email Address</label>
            </div>
            <div className="floating-label-group">
              <input type="text" id="subject" name="subject" required value={form.subject} onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-100 focus:ring-2 focus:ring-blue-500/20"
                placeholder=" " />
              <label htmlFor="subject" className="font-semibold">Subject</label>
            </div>
            <div className="floating-label-group">
              <textarea id="message" name="message" rows="6" required value={form.message} onChange={handleChange}
                className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none text-slate-100 focus:ring-2 focus:ring-blue-500/20"
                placeholder=" "></textarea>
              <label htmlFor="message" className="font-semibold">Your Message</label>
            </div>
            <MagneticButton>
              <button type="submit" disabled={submitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition font-semibold disabled:opacity-50 ripple-btn text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transform duration-300">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message →'}
              </button>
            </MagneticButton>
            {status.message && (
              <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
                status.type === 'success'
                  ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                  : 'bg-red-500/10 text-red-300 border border-red-500/20'
              }`}>
                <span className={`text-2xl ${status.type === 'success' ? 'success-pop' : ''}`}>
                  {status.type === 'success' ? '✅' : '❌'}
                </span>
                {status.message}
              </div>
            )}
          </form>
        </ScrollReveal>

        <ScrollReveal className="md:col-span-1" delay={300} direction="right">
          <div className="glass-card rounded-2xl p-8 sticky top-28 space-y-8">
            <div className="group">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition">📧</span>
                Email
              </h3>
              <a href="mailto:dhirendrahudda@gmail.com" className="text-slate-300 hover:text-blue-400 transition break-all pl-10">dhirendrahudda@gmail.com</a>
            </div>
            <div className="group">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition">📱</span>
                Phone
              </h3>
              <a href="tel:+919799279475" className="text-slate-300 hover:text-blue-400 transition pl-10">+91 9799279475</a>
            </div>
            <div className="group">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition">📍</span>
                Location
              </h3>
              <p className="text-slate-300 pl-10">Jodhpur, Rajasthan</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-4">Follow Me</h3>
              <div className="flex gap-3">
                <a href="https://github.com/DhirendraHudda98" target="_blank" rel="noreferrer" className="social-icon-animated" title="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/dhirendrahudda" target="_blank" rel="noreferrer" className="social-icon-animated" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://twitter.com/dhirendrahudda" target="_blank" rel="noreferrer" className="social-icon-animated" title="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
            <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for new projects
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
