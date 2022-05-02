import logo from 'assets/images/logo.png'
import { navbarList } from 'components/Navbar/mock-data'
import NavbarItem from 'components/Navbar/NavbarItem/NavbarItem'
import { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(100)
  const match = useRouteMatch()

  useEffect(() => {
    const featureRoute = match.url.split('/')[1]

    switch (featureRoute) {
      case 'event':
        setActiveIndex(0)
        break
      case 'bill':
        setActiveIndex(1)
        break
      case 'tour':
        setActiveIndex(2)
        break
      case 'user':
        setActiveIndex(3)
        break
      case 'statistic':
        setActiveIndex(4)
        break
      case 'profile':
        setActiveIndex(5)
        break
      default:
        break
    }
  }, [])

  const handleNavbarItemClick = (index: number) => () => {
    setActiveIndex(index)
  }

  const renderNavbarList = (): JSX.Element[] => {
    return navbarList.map((item, index) => (
      <NavbarItem
        key={item.display}
        to={item.to}
        display={item.display}
        icon={item.icon}
        isActive={activeIndex === index}
        onClick={handleNavbarItemClick(index)}
      />
    ))
  }

  return (
    <div className='border-r-2 border-gray-100'>
      <div className='h-screen pl-4'>
        <Link to='/' className='block my-2 ml-4 mr-8'>
          <span className='text-cyan-400 text-2xl font-medium'>Dulichdi</span>
        </Link>
        <ul>{renderNavbarList()}</ul>
      </div>
    </div>
  )
}

export default Navbar
