import { UserTableProps } from 'features/User/interface'
import { swal } from 'helper'

const UserTable: React.FC<UserTableProps> = ({ users, toggleBlockUser }) => {
  const handleActionButtonClick =
    (userId: string, userEmail: string, userDisable: boolean) => () => {
      const notiAction = userDisable ? 'enable' : 'disable'
      const notiText = userDisable
        ? 'This action will allow this user to login into their account'
        : 'This action will prevent user from logging in into their accounts!'

      swal
        .fire({
          title: `Are you sure to ${notiAction} account ${userEmail}`,
          text: notiText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText:
            notiAction.charAt(0).toUpperCase() + notiAction.slice(1),
        })
        .then(async result => {
          if (result.isConfirmed) {
            toggleBlockUser({
              userId,
              userEmail,
              userDisable,
            })
          }
        })
    }

  const renderTableData = (): JSX.Element[] =>
    users.map(({ _id, avatar, email, username, phone, disable }) => (
      <tr key={_id} className='text-center border-b-2 min-w-max'>
        <td className='w-1/5 py-2'>
          <img
            src={avatar}
            alt={username}
            className='w-20 h-20 inline object-contain'
          />
        </td>
        <td className='w-1/5 py-2'>{email}</td>
        <td className='w-1/5 py-2'>{username}</td>
        <td className='w-1/5 py-2'>{phone || '-/-'}</td>
        <td className='w-1/5 py-2'>
          {disable ? (
            <button
              onClick={handleActionButtonClick(_id, email, disable)}
              className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
            >
              Block
            </button>
          ) : (
            <button
              onClick={handleActionButtonClick(_id, email, disable)}
              className='bg-cyan-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-cyan-500 transition-all'
            >
              Active
            </button>
          )}
        </td>
      </tr>
    ))

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Avatar</th>
          <th className='py-4'>Email</th>
          <th className='py-4'>Username</th>
          <th className='py-4'>Phone</th>
          <th className='py-4'>Action</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default UserTable
