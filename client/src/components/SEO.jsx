import { useEffect } from 'react'

export default function SEO({ title, description }) {
  useEffect(() => {
    const base = 'Dhirendra Hudda'
    document.title = title ? `${title} | ${base}` : `${base} - Full Stack Developer`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description || 'Full Stack Developer portfolio — projects, skills, and contact information.'

    // Open Graph
    const ogTags = {
      'og:title': document.title,
      'og:description': meta.content,
      'og:type': 'website',
    }
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.content = content
    })
  }, [title, description])

  return null
}
