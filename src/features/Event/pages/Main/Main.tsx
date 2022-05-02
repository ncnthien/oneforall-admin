import eventApi from 'apis/eventApi'
import { EventTable } from 'features/Event/components'
import { Event } from 'features/Event/interface'
import { getClone, swal } from 'helper'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const {
          data: { data: events },
        } = await eventApi.getAll()

        setEvents(events)
      } catch (error) {
        // Handle errors occuring here
        console.log(error)
      }
    }

    fetchEvents()
  }, [])

  const handleDeleteEvent = async (eventId: string, eventTitle: string) => {
    try {
      const okStatus = 200
      const { status } = await eventApi.delete(eventId)
      if (status === okStatus) {
        swal.fire('Đã xóa!', `Xóa sự kiện ${eventTitle} thành công`, 'success')

        const clonedEvents = getClone(events)
        const newEvents = clonedEvents.filter(event => event._id !== eventId)
        setEvents(newEvents)
      }
    } catch (error) {
      swal.fire(
        'Opps!',
        `Xóa sự kiện ${eventTitle} thất bại, vui lòng thử lại!`,
        'error'
      )
    }
  }

  return (
    <div>
      <div className='flex justify-end mb-8'>
        <Link
          to='/event/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          Thêm sự kiện
        </Link>
      </div>
      <div className='max-w-full'>
        <EventTable events={events} deleteEvent={handleDeleteEvent} />
      </div>
    </div>
  )
}

export default Main
