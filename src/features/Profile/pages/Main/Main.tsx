import { useHistory } from 'react-router-dom'

const Main: React.FC = () => {
  const history = useHistory()

  const handleLogoutClicked = () => {
    localStorage.removeItem('jwtToken')
    history.push('/')
  }

  return (
    <div>
      <button
        className='bg-red-400 p-2 rounded-md text-white'
        onClick={handleLogoutClicked}
      >
        Logout
      </button>
    </div>
  )
}

export default Main
