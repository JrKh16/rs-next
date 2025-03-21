import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { deleteBooking } from '../actions'
import { revalidatePath } from 'next/cache'
import { useTransition } from 'react'

// ✅ ส่วน Client Component
function BookingsClient({ bookings }: { bookings: any[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการการจองทั้งหมด</h1>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p>ยังไม่มีการจอง</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="border p-4 rounded shadow">
              <p><strong>ชื่อ:</strong> {b.name}</p>
              <p><strong>ห้อง:</strong> {b.room}</p>
              <p><strong>วันที่:</strong> {new Date(b.date).toLocaleString()}</p>
              <button
                onClick={() => {
                  const confirmed = confirm(`ลบรายการของ ${b.name}?`)
                  if (confirmed) {
                    startTransition(() => {
                      deleteBooking(b._id)
                    })
                  }
                }}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                disabled={isPending}
              >
                {isPending ? 'กำลังลบ...' : 'ลบ'}
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

// ✅ ส่วน Server Component
export default async function BookingsPage() {
  await connectDB()
  const bookings = await Booking.find().sort({ date: -1 }).lean()
  return <BookingsClient bookings={JSON.parse(JSON.stringify(bookings))} />
}
