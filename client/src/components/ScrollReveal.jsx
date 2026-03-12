import { useInView } from '../hooks/useAnimations'

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  const directions = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directions[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
