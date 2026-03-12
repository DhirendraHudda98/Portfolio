import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [active, setActive] = useState(true)

  useEffect(() => {
    // Briefly hide content, then animate in
    setActive(false)
    const timer = setTimeout(() => {
      setActive(true)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className={active ? 'page-enter page-enter-active' : 'page-enter'}>
      {children}
    </div>
  )
}
