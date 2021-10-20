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
      case 'brand':
        setActiveIndex(0)
        break
      case 'event':
        setActiveIndex(1)
        break
      case 'order':
        setActiveIndex(2)
        break
      case 'product':
        setActiveIndex(3)
        break
      case 'user':
        setActiveIndex(4)
        break
      case 'statistic':
        setActiveIndex(5)
        break
      case 'profile':
        setActiveIndex(6)
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
          <img src={logo} alt='Oneforall' />
        </Link>
        <ul>{renderNavbarList()}</ul>
      </div>
    </div>
  )
}

export default Navbar
