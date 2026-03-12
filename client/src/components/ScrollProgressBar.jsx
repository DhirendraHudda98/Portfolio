import { useScrollProgress } from '../hooks/useAnimations'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60]">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(96,165,250,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
