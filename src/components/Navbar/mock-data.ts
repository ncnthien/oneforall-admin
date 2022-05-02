import brandImg from 'assets/images/brand.png'
import eventImg from 'assets/images/event.png'
import orderImg from 'assets/images/order.png'
import productImg from 'assets/images/product.png'
import profileImg from 'assets/images/profile.png'
import statisticImg from 'assets/images/statistic.png'
import usersImg from 'assets/images/users.png'

export const navbarList = [
  {
    icon: eventImg,
    to: '/event',
    display: 'Sự kiện',
  },
  {
    icon: orderImg,
    to: '/bill',
    display: 'Hóa đơn',
  },
  {
    icon: productImg,
    to: '/tour',
    display: 'Tour',
  },
  {
    icon: usersImg,
    to: '/user',
    display: 'Người dùng',
  },
  {
    icon: statisticImg,
    to: '/statistic',
    display: 'Thống kê',
  },
  {
    icon: profileImg,
    to: '/profile',
    display: 'Thông tin',
  },
]
