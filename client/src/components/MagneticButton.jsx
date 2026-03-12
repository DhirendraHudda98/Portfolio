import { useMagnetic } from '../hooks/useAnimations'

export default function MagneticButton({ children, className = '', href, onClick, ...props }) {
  const magneticRef = useMagnetic(0.3)

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={magneticRef}
      className={`magnetic-btn ${className}`}
      href={href}
      onClick={onClick}
      {...props}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </Tag>
  )
}
