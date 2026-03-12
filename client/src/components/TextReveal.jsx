import { useRef, useEffect } from 'react'
import { useInView } from '../hooks/useAnimations'

export default function TextReveal({ children, className = '', as: Tag = 'h2', delay = 0 }) {
  const [ref, isInView] = useInView({ threshold: 0.3 })
  const wordsRef = useRef(null)

  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    if (!wordsRef.current) return
    const spans = wordsRef.current.querySelectorAll('.text-reveal-word')
    spans.forEach((span, i) => {
      if (isInView) {
        span.style.transitionDelay = `${delay + i * 80}ms`
        span.style.transform = 'translateY(0)'
        span.style.opacity = '1'
      } else {
        span.style.transform = 'translateY(100%)'
        span.style.opacity = '0'
      }
    })
  }, [isInView, delay])

  if (!text) {
    return <Tag ref={ref} className={className}>{children}</Tag>
  }

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`${className}`}>
      <span ref={wordsRef} className="inline-flex flex-wrap gap-x-[0.3em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <span
              className="text-reveal-word inline-block transition-all duration-500 ease-out"
              style={{ transform: 'translateY(100%)', opacity: 0 }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
