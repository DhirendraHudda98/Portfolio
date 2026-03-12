import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import ErrorBoundary from './components/ErrorBoundary'
import PageTransition from './components/PageTransition'
import AnimatedCursor from './components/AnimatedCursor'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
      <BrowserRouter>
        <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col theme-transition">
          <ScrollProgressBar />
          <AnimatedCursor />
          <Navbar />
          <main className="pt-20 flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
