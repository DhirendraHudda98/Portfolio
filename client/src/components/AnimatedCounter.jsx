import { useCounter } from '../hooks/useAnimations'

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, duration = 2000 }) {
  const [ref, count] = useCounter(end, duration)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {prefix}{count}{suffix}
      </div>
      <p className="text-slate-400 text-sm mt-2">{label}</p>
    </div>
  )
}
