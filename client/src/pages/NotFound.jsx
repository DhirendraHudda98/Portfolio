import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <SEO title="404 - Page Not Found" />
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-slate-300 mb-8">Page Not Found</p>
        <p className="text-slate-400 mb-8 max-w-md">Looks like the page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
