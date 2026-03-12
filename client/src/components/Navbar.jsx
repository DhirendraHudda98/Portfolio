import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-xl border-b border-slate-800/50 light:border-slate-200/50 shadow-lg shadow-black/5'
        : 'bg-slate-950/60 dark:bg-slate-950/60 light:bg-white/60 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
          Portfolio
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link relative py-1 hover:text-blue-400 transition-colors duration-300 font-medium ${location.pathname === link.to ? 'text-blue-400 active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a href="/api/cv/download" className="text-blue-400 hover:text-cyan-400 transition font-semibold nav-link flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            CV
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Toggle theme"
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-sm ${
              theme === 'dark'
                ? 'left-0.5 bg-slate-700 rotate-0'
                : 'left-7 bg-yellow-400 rotate-180'
            }`}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-xl p-1 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            className={`flex flex-col gap-1.25 p-1.5 transition-all ${mobileOpen ? 'hamburger-open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile menu — slide down */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900/95 light:bg-white/95 backdrop-blur-xl border-t border-slate-800/50 light:border-slate-200/50 px-4 py-4 space-y-1 animate-slideDown">
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 font-medium list-item-animate ${location.pathname === link.to ? 'text-blue-400 bg-blue-500/5' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/api/cv/download"
            className="flex py-3 px-4 rounded-lg text-blue-400 hover:text-cyan-400 hover:bg-blue-500/10 transition font-semibold list-item-animate items-center gap-2"
            style={{ animationDelay: `${links.length * 80}ms` }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
      )}
    </nav>
  )
}
