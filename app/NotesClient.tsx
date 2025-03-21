'use client'

// ✅ ลบ Note ที่ import มาแต่ไม่ได้ใช้
import { useState, useTransition } from 'react'
import { deleteNote, updateNote } from './actions'

interface NoteItem {
  _id: string
  text: string
  createdAt: string
  owner?: string
}

interface Session {
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export default function NotesClient({
  notes,
  session,
}: {
  notes: NoteItem[]
  session: Session | null
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [isPending, startTransition] = useTransition()

  return (
    <div className="space-y-2">
      {notes.map((n) => (
        <div key={n._id} className="border p-3 rounded shadow flex justify-between items-center">
          {editingId === n._id ? (
            <form
              action={() => {
                startTransition(() => updateNote(n._id, editText))
                setEditingId(null)
              }}
              className="flex-grow flex gap-2"
            >
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 flex-grow"
              />
              <button type="submit" className="text-green-600">บันทึก</button>
            </form>
          ) : (
            <>
              <span>{n.text}</span>
              {session && (
                <div className="space-x-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(n._id)
                      setEditText(n.text)
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => {
                      const confirmDelete = confirm(`ลบ "${n.text}"?`)
                      if (confirmDelete) {
                        startTransition(() => deleteNote(n._id))
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    ลบ
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
