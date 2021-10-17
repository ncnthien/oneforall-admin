import { Navbar } from 'components'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className='flex'>
      <Navbar />
      <div className='bg-gray-100 flex-grow'>
        <div className='flex items-center justify-center w-full h-full p-4'>
          <div className='bg-white w-full h-full rounded-t-2xl'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
