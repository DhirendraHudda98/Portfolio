import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-400 mb-8">An unexpected error occurred. Please try refreshing the page.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
              >
                Refresh Page
              </button>
              <Link to="/" className="px-6 py-3 border border-blue-400 hover:bg-blue-400/10 rounded-lg transition font-semibold"
                onClick={() => this.setState({ hasError: false, error: null })}>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
