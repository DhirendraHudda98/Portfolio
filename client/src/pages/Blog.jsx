import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(d => { setBlogs(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
        <span className="w-1 h-14 bg-gradient-to-b from-cyan-400 to-blue-400 rounded"></span>
        Blog Articles
      </h1>
      <p className="text-slate-400 mb-12 text-lg">Thoughts and insights on web development</p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {blogs.length > 0 ? blogs.map(blog => (
          <Link key={blog._id} to={`/blog/${blog.slug}`} className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300 card-hover block">
            {blog.imageUrl && (
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
              </div>
            )}
            <div className="p-6">
              <div className="text-xs text-slate-500 mb-3">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags && blog.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">{tag}</span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition">{blog.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
              <div className="text-cyan-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                Read More <span>→</span>
              </div>
            </div>
          </Link>
        )) : (
          <div className="col-span-full text-center py-20 text-slate-400">
            <p className="text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
