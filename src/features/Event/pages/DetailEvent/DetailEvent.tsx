import eventApi from 'apis/eventApi'
import { Event, LocationState } from 'features/Event/interface'
import { checkFalsyKey, getClone, swal } from 'helper'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { serialize } from 'object-to-formdata'

const defaultUpdatingEvent: Event = {
  _id: '',
  images: null,
  title: '',
  __v: 0,
  createdAt: '',
  description: '',
  updatedAt: '',
}

const DetailEvent: React.FC = () => {
  const history = useHistory()
  const { state } = useLocation<LocationState>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [event, setEvent] = useState<Event>(defaultUpdatingEvent)
  const titleMaxLength = 40

  useEffect(() => {
    const fetchDetailEvent = async () => {
      try {
        const {
          data: { data: event },
        } = await eventApi.get(state._id)
        setEvent(event)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDetailEvent()
  }, [])

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    setEvent({ ...event, images: e.target.files[0] })
  }

  const handleUpdateButtonClick = async () => {
    if (isLoading) {
      return
    }

    if (!checkFalsyKey<Event>(event)) {
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

    try {
      setIsLoading(true)
      const okStatus = 200
      const clonedEvent: any = getClone(event)

      console.log({ clonedEvent })

      clonedEvent.photos = event.images
      delete clonedEvent.images

      const formData = serialize(clonedEvent)

      console.log({ formData })

      const { status } = await eventApi.update(event._id, formData)

      setIsLoading(false)
      if (status === okStatus) {
        const result = await swal.fire(
          'Xong!',
          `Cập nhật thành công!`,
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
        </div>
        <div className='w-8/12 flex items-center justify-center'>
          <input
            type='file'
            name='banner'
            id='banner'
            className=''
            onChange={handleFileChange}
            accept='image/*'
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
            <span>Cập nhật</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailEvent
