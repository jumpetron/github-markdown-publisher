'use client'

import { useState } from 'react'

export default function DraftList({ drafts, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const startEdit = (draft) => {
    setEditingId(draft.id)
    setTitle(draft.title)
    setBody(draft.body)
  }

  const saveEdit = (id) => {
    onUpdate(id, title, body)
    setEditingId(null)
    setTitle('')
    setBody('')
  }

  return (
    <div className='space-y-4'>
      {drafts.length === 0 && <p className='text-gray-500'>No drafts yet.</p>}
      {drafts.map((draft) => (
        <div
          key={draft.id}
          className='p-4 border rounded-md flex justify-between items-start gap-4'>
          {editingId === draft.id ? (
            <div className='flex-1 space-y-2'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full p-2 border rounded-md'
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                className='w-full p-2 border rounded-md'
              />
              <button
                onClick={() => saveEdit(draft.id)}
                className='px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700'>
                Save
              </button>
            </div>
          ) : (
            <div className='flex-1'>
              <h3 className='font-semibold'>{draft.title}</h3>
              <p className='text-sm text-gray-600 whitespace-pre-wrap'>
                {draft.body}
              </p>
            </div>
          )}
          <div className='flex flex-col gap-2'>
            {editingId !== draft.id && (
              <button
                onClick={() => startEdit(draft)}
                className='px-3 py-1 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black text-sm cursor-pointer'>
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(draft.id)}
              className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-white hover:text-black border border-red-500 text-sm cursor-pointer'>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
