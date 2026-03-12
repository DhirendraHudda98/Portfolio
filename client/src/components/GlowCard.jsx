import { useRef, useCallback } from 'react'

export default function GlowCard({ children, className = '', glowColor = 'rgba(96, 165, 250, 0.15)' }) {
  const cardRef = useRef(null)

  const handleMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
    card.style.setProperty('--glow-opacity', '1')
  }, [])

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--glow-opacity', '0')
  }, [])

  return (
    <div
      ref={cardRef}
      className={`glow-card-wrapper ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ '--glow-color': glowColor }}
    >
      {children}
    </div>
  )
}
