import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>
  if (!data) return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <Link to="/blog" className="text-cyan-400 hover:text-cyan-300">← Back to Blog</Link>
    </div>
  )

  const { blog, relatedPosts } = data

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <article className="mb-12">
        <div className="mb-8">
          <div className="text-xs text-slate-500 mb-4">
            {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • By {blog.author}
          </div>
          <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags && blog.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-cyan-500/10 text-cyan-300 text-sm rounded-full border border-cyan-500/20">{tag}</span>
            ))}
          </div>
          {blog.imageUrl && (
            <div className="rounded-lg overflow-hidden mb-8 h-96">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blog.content }}></div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <span className="text-lg">👨‍💻</span>
            </div>
            <div>
              <p className="font-semibold">{blog.author}</p>
              <p className="text-slate-400 text-sm">Full Stack Developer</p>
            </div>
          </div>
          <p className="text-slate-400">Thanks for reading! Feel free to reach out if you have any questions or feedback about this article.</p>
        </div>
      </article>

      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded"></span>
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="group bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500 transition">
                <div className="text-xs text-slate-500 mb-3">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-400 transition">{post.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 transition inline-flex items-center gap-2">
          <span>←</span> Back to all articles
        </Link>
      </div>
    </div>
  )
}
