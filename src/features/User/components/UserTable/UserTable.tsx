import { User, UserTableProps } from 'features/User/interface'
import { swal } from 'helper'

const UserTable: React.FC<UserTableProps> = ({ users, toggleBlockUser }) => {
  const handleActionButtonClick = (user: User, userDisable: boolean) => () => {
    const notiAction = userDisable ? 'mở khóa' : 'khóa'
    const notiText = userDisable
      ? 'Hành động này sẽ cho phép người dùng đăng nhập vào hệ thống!'
      : 'Hành động này sẽ ngăn chặn người dùng đăng nhập vào hệ thống!'

    swal
      .fire({
        title: `Bạn có chắc muốn ${notiAction} tài khoản ${user.email}`,
        text: notiText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:
          notiAction.charAt(0).toUpperCase() + notiAction.slice(1),
      })
      .then(async result => {
        if (result.isConfirmed) {
          toggleBlockUser({
            user,
            userDisable,
          })
        }
      })
  }

  const renderTableData = (): (JSX.Element | null)[] =>
    users.map(user =>
      !user.isAdmin ? (
        <tr key={user._id} className='text-center border-b-2 min-w-max'>
          <td className='w-1/5 py-2'>
            <img
              src={user.avatar}
              alt={user.username}
              className='w-20 h-20 inline object-contain'
            />
          </td>
          <td className='w-1/5 py-2'>{user.email}</td>
          <td className='w-1/5 py-2'>{user.username}</td>
          <td className='w-1/5 py-2'>{user.phone || '-/-'}</td>
          <td className='w-1/5 py-2'>
            {user.isBlocked ? (
              <button
                onClick={handleActionButtonClick(user, !user.isBlocked)}
                className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
              >
                Khóa
              </button>
            ) : (
              <button
                onClick={handleActionButtonClick(user, !user.isBlocked)}
                className='bg-green-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-green-500 transition-all'
              >
                Mở khóa
              </button>
            )}
          </td>
        </tr>
      ) : null
    )

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
