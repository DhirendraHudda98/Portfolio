export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn z-10">
      <span className="text-xs text-slate-400 tracking-[0.3em] uppercase font-medium">Scroll</span>
      <div className="scroll-indicator-mouse">
        <div className="scroll-indicator-wheel" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="w-px h-3 bg-slate-500/50 animate-pulse" />
        <span className="w-px h-3 bg-slate-500/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  )
}
