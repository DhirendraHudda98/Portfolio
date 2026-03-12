import { useState, useEffect, useCallback } from 'react'

export default function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)

  const move = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return

    let rafId
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }))
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [pos])

  useEffect(() => {
    if ('ontouchstart' in window) return

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Detect hoverable elements
    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, .cursor-hover')
      setHovering(!!el)
    }

    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [move])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  const opacity = hidden ? 0 : 1

  return (
    <>
      {/* Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px) scale(${clicking ? 0.5 : 1})`,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#fff',
          transition: 'transform 0.1s ease, opacity 0.3s',
          opacity,
        }}
      />
      {/* Ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        style={{
          transform: `translate(${trail.x - (hovering ? 24 : 18)}px, ${trail.y - (hovering ? 24 : 18)}px) scale(${clicking ? 0.8 : 1})`,
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.6)',
          backgroundColor: hovering ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease, transform 0.15s ease, background-color 0.3s, opacity 0.3s',
          opacity,
        }}
      />
    </>
  )
}
