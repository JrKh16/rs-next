'use server'

import connectDB from '@/lib/mongodb'
import Note from '@/models/Note'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export async function createNote(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) return

  const text = formData.get('text') as string
  if (!text) return

  await connectDB()
  await Note.create({ text, owner: session.user?.email })

  revalidatePath('/') // ✅ สำคัญสุด!
}


export async function deleteNote(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) return

  await connectDB()
  const note = await Note.findById(id)
  if (note?.owner !== session.user?.email) return

  await Note.findByIdAndDelete(id)
  revalidatePath('/')
}

export async function updateNote(id: string, text: string) {
  const session = await getServerSession(authOptions)
  if (!session) return

  await connectDB()
  const note = await Note.findById(id)
  if (note?.owner !== session.user?.email) return

  await Note.findByIdAndUpdate(id, { text })
  revalidatePath('/')
}
