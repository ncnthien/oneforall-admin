import { NavbarItemProps } from 'components/Navbar/NavbarItem/interface'
import { Link } from 'react-router-dom'

const NavbarItem: React.FC<NavbarItemProps> = ({
  icon,
  to,
  display,
  isActive,
  onClick,
}) => {
  const activeLinkClass =
    'bg-gray-100 text-cyan-400 font-semibold rounded-l-full'
  const activeImgClass = 'convert-to-cyan'

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-5 py-4 text-sm pr-8 transition-all hover:bg-gray-100 rounded-l-full ${
          isActive ? activeLinkClass : ''
        }`}
        onClick={onClick}
      >
        <img
          src={icon}
          alt={display}
          className={`mr-2 ${isActive ? activeImgClass : ''}`}
        />
        <span>{display}</span>
      </Link>
    </li>
  )
}

export default NavbarItem
