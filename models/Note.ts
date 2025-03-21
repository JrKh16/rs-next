import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  owner: String, // ✅ email ผู้เป็นเจ้าของโน้ต
})

const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema)
export default Note