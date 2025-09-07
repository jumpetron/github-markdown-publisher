'use client'

import { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import Editor from '@/components/Edittor'
import DraftList from '@/components/DraftList'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [html, setHtml] = useState('')
  const [drafts, setDrafts] = useState([])

  const md = new MarkdownIt()

  // Fetch markdown file from GitHub
  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch(
        'https://raw.githubusercontent.com/jumpetron/github-rest-api/main/content/hello.md'
      )
      const text = await res.text()
      setHtml(DOMPurify.sanitize(md.render(text)))
    }
    fetchMarkdown()
  }, [])

  // Load drafts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('drafts')
    if (saved) setDrafts(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('drafts', JSON.stringify(drafts))
  }, [drafts])

  const addDraft = (title, body) => {
    setDrafts([...drafts, { id: Date.now().toString(), title, body }])
  }

  const updateDraft = (id, title, body) => {
    setDrafts(drafts.map((d) => (d.id === id ? { ...d, title, body } : d)))
  }

  const deleteDraft = (id) => {
    setDrafts(drafts.filter((d) => d.id !== id))
  }

  const publishAll = async () => {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drafts })
    })
    if (res.ok) {
      console.log(res)
      toast.success('Published successfully!')
      setDrafts([])
    } else {
      toast.error('Error publishing drafts')
    }
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        Markdown from GitHub
      </h1>
      <div className='prose mb-8' dangerouslySetInnerHTML={{ __html: html }} />

      <h2 className='text-2xl font-semibold mb-2'>Create Draft</h2>
      <Editor onSave={addDraft} />

      <h2 className='text-2xl font-semibold mt-8 mb-2'>Drafts</h2>
      <DraftList
        drafts={drafts}
        onUpdate={updateDraft}
        onDelete={deleteDraft}
      />

      {drafts.length > 0 && (
        <button
          onClick={publishAll}
          className='rounded-md w-full cursor-pointer group relative inline-block text-sm font-medium text-black focus:outline-none mt-4'>
          <span className='rounded-md absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0'></span>
          <span className='rounded-md relative block border border-current bg-white px-8 py-3 '>
            Publish All
          </span>
        </button>
      )}
    </div>
  )
}
