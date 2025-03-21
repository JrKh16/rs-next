'use client'

import Note from '@/models/Note' 


interface Note {
    _id: string
    text: string
    createdAt: string
}
export default function NotesClient({ notes }: { notes: any[] }) {
    return <div>...</div>
  }