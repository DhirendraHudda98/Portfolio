import { useTilt } from '../hooks/useAnimations'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const tiltRef = useTilt(intensity)

  return (
    <div ref={tiltRef} className={`tilt-card ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      <div style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </div>
  )
}
