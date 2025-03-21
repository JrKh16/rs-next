import connectDB from './mongodb'
import Note from '@/models/Note'

export default async function getNotes() {
  await connectDB()
  const notes = await Note.find().sort({ createdAt: -1 }).lean()
  return notes
}
