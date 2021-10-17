import { Navbar } from 'components'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-2/12'>
        <Navbar />
      </div>
      <div className='bg-gray-100 w-10/12'>
        <div className='w-full h-full p-4'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
