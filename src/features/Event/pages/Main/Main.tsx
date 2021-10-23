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
        const { data: events } = await eventApi.getAll()
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
        swal.fire('Deleted!', `Delete ${eventTitle} successfully`, 'success')

        const clonedEvents = getClone(events)
        const newEvents = clonedEvents.filter(event => event._id !== eventId)
        setEvents(newEvents)
      }
    } catch (error) {
      swal.fire(
        'Opps!',
        `Delete ${eventTitle} failed, please try again!`,
        'error'
      )
    }
  }

  const handleToggleActiveEvent = async (event: Event) => {
    try {
      const updatingEvent = { ...event, isActive: !event.isActive } as Event
      const { data: newEvent } = await eventApi.update(event._id, updatingEvent)
      const clonedEvents = getClone(events)
      const newEvents = clonedEvents.map(clonedEvent =>
        clonedEvent._id === event._id ? newEvent : clonedEvent
      )
      setEvents(newEvents)
      swal.fire(
        'Done!',
        `${event.title} is ${event.isActive ? 'disable' : 'active'}!`,
        'success'
      )
    } catch (error) {
      // Handle UI if error occurs here!
      console.log(error)
    }
  }

  return (
    <div>
      <div className='flex justify-end mb-8'>
        <Link
          to='/event/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          New event
        </Link>
      </div>
      <div className='max-w-full'>
        <EventTable
          events={events}
          deleteEvent={handleDeleteEvent}
          toggleActiveEvent={handleToggleActiveEvent}
        />
      </div>
    </div>
  )
}

export default Main
