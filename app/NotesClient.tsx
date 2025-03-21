// ✅ Client Component (app/NotesClient.tsx)
'use client'

import { createNote } from './actions' // ❌ ทำแบบนี้ไม่ได้

export default function NotesClient({ notes }: { notes: any[] }) {
  return (
    <form action={createNote}> {/* ❌ จะ error แบบที่คุณเจอ */}
      ...
    </form>
  )
}
