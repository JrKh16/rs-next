import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import Note from '@/models/Note'
import { createNote } from './actions'
import NoteList from './NoteList'
import Link from 'next/link'

export default async function Page() {
  const session = await getServerSession(authOptions)
  await connectDB()

  const notes = session
    ? await Note.find({ owner: session.user?.email }).sort({ createdAt: -1 }).lean()
    : []

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">โน้ตของคุณ</h1>
        {session ? (
          <form action="/api/auth/signout" method="post">
            <button className="text-red-500">ออกจากระบบ</button>
          </form>
        ) : (
          <Link href="/api/auth/signin" className="text-blue-600">
            เข้าสู่ระบบ
          </Link>
        )}
      </div>

      {session && (
        <form action={createNote} className="space-y-2">
          <input name="text" className="w-full border p-2" placeholder="เพิ่มโน้ตใหม่..." />
          <button className="bg-blue-600 text-white px-4 py-1 rounded">เพิ่ม</button>
        </form>
      )}

      <NoteList notes={JSON.parse(JSON.stringify(notes))} session={session} />
    </main>
  )
}
