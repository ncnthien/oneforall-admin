import { EventTableProps } from 'features/Event/interface'
import { Link } from 'react-router-dom'
import { swal } from 'helper'

const EventTable: React.FC<EventTableProps> = ({ events, deleteEvent }) => {
  const handleRemoveButtonClick =
    (eventId: string, eventTitle: string) => () => {
      swal
        .fire({
          title: `Bạn có chắc muốn xóa sự kiện ${eventTitle}`,
          text: 'Bạn sẽ không thể hoàn tác!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Vâng, xóa nó!',
        })
        .then(async result => {
          if (result.isConfirmed) {
            deleteEvent(eventId, eventTitle)
          }
        })
    }

  const renderTableData = (): JSX.Element[] => {
    return events.map(event => (
      <tr key={event._id} className='text-center border-b-2 min-w-max'>
        <td className='w-4/12 py-2 px-4'>
          <img
            src={(event.images as string[])[0]}
            alt={event.title}
            className='w-full inline'
          />
        </td>
        <td className='w-4/12 py-2 px-4'>{event.title}</td>
        <td className='w-4/12 py-2 px-4'>
          <Link
            to={{
              pathname: `/event/${event._id}`,
              state: { _id: event._id },
            }}
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-1 text-sm hover:bg-cyan-500 transition-all'
          >
            Chi tiết
          </Link>
          <button
            onClick={handleRemoveButtonClick(event._id, event.title)}
            className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
          >
            Xóa
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Ảnh</th>
          <th className='py-4'>Tiêu đề</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default EventTable
