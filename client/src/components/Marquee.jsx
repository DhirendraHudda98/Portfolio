export default function Marquee({ items = [], speed = 30, className = '' }) {
  const content = items.length > 0 ? items : [
    'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'Python', 'Docker', 'AWS', 'GraphQL', 'REST API',
  ]

  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div
        className="marquee-track flex gap-8 whitespace-nowrap"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {[...content, ...content].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm font-medium text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm select-none"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
