import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(d => { setProject(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-20 animate-pulse">
      <SEO title="Project" />
      <div className="h-6 bg-slate-800 rounded w-32 mb-12" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-96 bg-slate-800 rounded-lg" />
          <div className="h-10 bg-slate-800 rounded w-2/3" />
          <div className="h-6 bg-slate-800 rounded w-full" />
          <div className="h-6 bg-slate-800 rounded w-5/6" />
        </div>
        <div className="md:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-4">
            <div className="h-4 bg-slate-800 rounded w-1/2" />
            <div className="h-12 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
  if (!project) return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <Link to="/projects" className="text-blue-400 hover:text-blue-300">← Back to Projects</Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <SEO title={project.title} description={project.description} />
      <Link to="/projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mb-12">
        <span>←</span> Back to Projects
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-8 rounded-lg overflow-hidden h-96 bg-slate-800">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">{project.description}</p>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded"></span>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map(tech => (
                <div key={tech} className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300">{tech}</div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded"></span>
                Gallery
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <img src={img.url} alt={img.altText || project.title} className="w-full h-48 object-cover" />
                    {img.caption && <p className="text-sm text-slate-400 mt-2">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded"></span>
              Key Features
            </h2>
            <ul className="space-y-3 text-slate-300">
              {['Responsive and mobile-friendly design', 'Modern UI/UX with smooth animations', 'Performance optimized', 'Best practices implementation'].map(f => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 sticky top-28 space-y-6">
            <div>
              <p className="text-sm text-slate-400 mb-3">GitHub Repository</p>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold">View on GitHub</a>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <h3 className="font-semibold mb-4 text-blue-400">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Created</p>
                  <p className="text-slate-300">{new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-slate-500">Technologies</p>
                  <p className="text-slate-300">{project.technologies.length} technologies used</p>
                </div>
                {project.featured && (
                  <div>
                    <p className="text-slate-500">Status</p>
                    <p className="text-green-400 font-semibold">Featured Project</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
