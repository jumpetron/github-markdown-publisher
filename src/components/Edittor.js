'use client'

import { useState } from 'react'

export default function Editor({ onSave }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    onSave(title, body)
    setTitle('')
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <input
        type='text'
        placeholder='Post title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='mt-2 w-full p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent'
      />
      <textarea
        placeholder='Write your content...'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        className='mt-2 w-full p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent'
      />
      <button
        type='submit'
        className='rounded-md w-full cursor-pointer group relative inline-block text-sm font-medium text-black focus:outline-none'>
        <span className='rounded-md absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0'></span>
        <span className='rounded-md relative block border border-current bg-white px-8 py-3'>
          Save Draft
        </span>
      </button>
    </form>
  )
}
