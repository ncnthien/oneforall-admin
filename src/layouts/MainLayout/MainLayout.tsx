import { Navbar } from 'components'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className='flex'>
      <Navbar />
      <div className='bg-gray-100 flex-grow'>
        <div className='w-full h-full p-4'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
