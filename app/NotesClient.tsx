'use client'

import { createNote } from './actions' // ❌ ทำแบบนี้ไม่ได้

interface Note {
    _id: string
    text: string
    createdAt: string
}
export default function NotesClient({ notes }: { notes: any[] }) {
    return (
        <form action={createNote}> {/* ❌ จะ error แบบที่คุณเจอ */}
            ...
        </form>
    )
}
