import userApi from 'apis/userApi'
import { UserTable } from 'features/User/components'
import { ToggleBlockUserParam, User } from 'features/User/interface'
import { swal } from 'helper'
import { useDebounce } from 'hooks'
import React, { useEffect, useState } from 'react'

const Main: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchUserText, setSearchUserText] = useState<string>('')
  const fetchUsers = async () => {
    try {
      const { data: users } = await userApi.getAll()
      setUsers(users)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchUser = async (text: string) => {
    if (text.length === 0) {
      fetchUsers()
      return
    }

    try {
      const { data: users } = await userApi.search(text)
      setUsers(users)
    } catch (error) {
      console.log(error)
    }
  }

  useDebounce(() => handleSearchUser(searchUserText), 350, [searchUserText])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearchUserTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchUserText(event.target.value)
  }

  const handleToggleBlockUser = async ({
    userId,
    userEmail,
    userDisable,
  }: ToggleBlockUserParam) => {
    try {
      const okStatus = 200
      const { status } = await userApi.block(userId)
      if (status === okStatus) {
        fetchUsers()
        swal.fire(
          'Done!',
          `Account ${userEmail} is ${userDisable ? 'active' : 'disable'} now!`,
          'success'
        )
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
        <input
          type='text'
          className='rounded-md w-80 shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400'
          placeholder='Find user...'
          value={searchUserText}
          onChange={handleSearchUserTextChange}
        />
      </div>
      <UserTable users={users} toggleBlockUser={handleToggleBlockUser} />
    </div>
  )
}

export default Main
