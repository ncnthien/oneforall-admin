import brandImg from 'assets/images/brand.png'
import eventImg from 'assets/images/event.png'
import orderImg from 'assets/images/order.png'
import productImg from 'assets/images/product.png'
import profileImg from 'assets/images/profile.png'
import statisticImg from 'assets/images/statistic.png'
import usersImg from 'assets/images/users.png'

export const navbarList = [
  {
    icon: brandImg,
    to: '/brand',
    display: 'Thương hiệu',
  },
  {
    icon: eventImg,
    to: '/event',
    display: 'Sự kiện',
  },
  {
    icon: orderImg,
    to: '/order',
    display: 'Đơn hàng',
  },
  {
    icon: productImg,
    to: '/product',
    display: 'Sản phẩm',
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
    display: 'Hồ sơ',
  },
]
