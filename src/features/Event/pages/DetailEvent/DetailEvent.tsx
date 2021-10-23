import { useLocation, Link, useHistory } from 'react-router-dom'
import { LocationState, Event } from 'features/Event/interface'
import { useEffect, useState } from 'react'
import {
  convertToBase64,
  swal,
  checkFalsyKey,
  getClone,
  removeTag,
} from 'helper'
import eventApi from 'apis/eventApi'

const DetailEvent: React.FC = () => {
  const history = useHistory()
  const defaultUpdatingEvent: Event = {
    _id: '',
    banner: '',
    title: '',
    isActive: false,
    url: '',
    __v: 0,
  }
  const { state } = useLocation<LocationState>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [event, setEvent] = useState<Event>(defaultUpdatingEvent)
  const titleMaxLength = 40
  const urlMaxLength = 100

  useEffect(() => {
    const fetchDetailEvent = async () => {
      try {
        const { data: event } = await eventApi.get(state._id)
        setEvent(event)
        console.log(event)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDetailEvent()
  }, [])

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    const targetFile = e.target.files[0]
    const base64Image = await convertToBase64(targetFile)
    const newEvent = { ...event, [e.target.name]: base64Image }

    setEvent(newEvent)
  }

  const handleUpdateButtonClick = async () => {
    if (isLoading) {
      return
    }

    if (!checkFalsyKey<Event>(event)) {
      console.log(event)
      return swal.fire(
        'Opps!',
        'There is some fields omitted, please fill out!',
        'error'
      )
    }

    if (event.title.length > titleMaxLength) {
      return swal.fire(
        'Opps!',
        `Maximum length of title is ${titleMaxLength}`,
        'error'
      )
    }

    if (event.url.length > urlMaxLength) {
      return swal.fire(
        'Opps!',
        `Maximum length of url is ${urlMaxLength}`,
        'error'
      )
    }

    try {
      setIsLoading(true)
      const okStatus = 200
      const clonedEvent = getClone(event)

      // Remove tag to get only base64 string
      clonedEvent.banner = removeTag(event.banner)
      const { data: newEvent, status } = await eventApi.update(
        clonedEvent._id,
        clonedEvent
      )
      setIsLoading(false)
      if (status === okStatus) {
        setEvent(newEvent)
        const result = await swal.fire(
          'Done!',
          `Updating event successfully`,
          'success'
        )

        if (result.isDismissed || result.isConfirmed) {
          history.push('/event')
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false)
      let message = 'Updating event failed, please try again'
      if (error.response) {
        message = error.response.data
      }

      swal.fire('Opps!', message, 'error')
    }
  }

  return (
    <div>
      <div className='mb-8'>
        <Link
          to='/event'
          className='text-white bg-cyan-400 py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 transition-all'
        >
          Back
        </Link>
      </div>
      <div className='bg-white rounded-md shadow-md py-16 px-20 flex flex-wrap'>
        <div className='w-4/12 pr-12'>
          <div className='mb-8'>
            <label htmlFor='title' className='inline-block mb-2'>
              Title:
            </label>
            <br />
            <input
              type='text'
              id='title'
              className='border-2 border-gray-300 rounded-sm w-full px-2 focus:outline-none'
              name='title'
              value={event.title}
              onChange={handleTextFieldChange}
            />
          </div>
          <div>
            <label htmlFor='url' className='inline-block mb-2'>
              URL:
            </label>
            <br />
            <input
              type='text'
              id='url'
              className='border-2 border-gray-300 rounded-sm w-full px-2 focus:outline-none'
              name='url'
              value={event.url}
              onChange={handleTextFieldChange}
            />
          </div>
        </div>
        <div className='w-8/12 flex items-center justify-center'>
          <label htmlFor='banner' className='cursor-pointer'>
            {event.banner ? (
              <img src={event.banner} alt='' className='w-full' />
            ) : (
              <label
                htmlFor='banner'
                className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all text-sm w-60 cursor-pointer'
              >
                Add banner
              </label>
            )}
          </label>
          <input
            type='file'
            name='banner'
            id='banner'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
        <div className='w-full text-center mt-12'>
          <button
            onClick={handleUpdateButtonClick}
            className={`bg-green-400 text-white py-2 px-4 mx-auto rounded-md shadow-md hover:bg-green-500 transition-all flex items-center ${
              isLoading ? 'cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className='animate-spin -ml-1 mr-2 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
            <span>Updating</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailEvent
