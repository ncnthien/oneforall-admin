import { Event, EventTableProps } from 'features/Event/interface'
import { Link } from 'react-router-dom'
import { swal } from 'helper'

const EventTable: React.FC<EventTableProps> = ({
  events,
  deleteEvent,
  toggleActiveEvent,
}) => {
  const handleRemoveButtonClick =
    (eventId: string, eventTitle: string) => () => {
      swal
        .fire({
          title: `Are you sure to delete event ${eventTitle}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async result => {
          if (result.isConfirmed) {
            deleteEvent(eventId, eventTitle)
          }
        })
    }

  const handleToggleButtonClick = (event: Event) => () => {
    toggleActiveEvent(event)
  }

  const renderTableData = (): JSX.Element[] =>
    events.map(event => (
      <tr key={event._id} className='text-center border-b-2 min-w-max'>
        <td className='w-4/12 py-2 px-4'>
          <img src={event.banner} alt={event.title} className='w-full inline' />
        </td>
        <td className='w-2/12 py-2 px-4'>{event.title}</td>
        <td className='w-2/12 py-2 px-4'>{event.url}</td>
        <td className='w-4/12 py-2 px-4'>
          <button
            onClick={handleToggleButtonClick(event)}
            className='bg-yellow-400 text-white rounded py-2 px-3 inline-block mr-1 text-sm hover:bg-yellow-500 transition-all'
          >
            {event.isActive ? 'Active' : 'Disable'}
          </button>
          <Link
            to={{
              pathname: `/event/${event._id}`,
              state: { _id: event._id },
            }}
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-1 text-sm hover:bg-cyan-500 transition-all'
          >
            Detail
          </Link>
          <button
            onClick={handleRemoveButtonClick(event._id, event.title)}
            className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
          >
            Remove
          </button>
        </td>
      </tr>
    ))

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Banner</th>
          <th className='py-4'>Title</th>
          <th className='py-4'>URL</th>
          <th className='py-4'>Actions</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default EventTable
