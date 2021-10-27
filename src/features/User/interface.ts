export interface ToggleBlockUserParam {
  userId: string
  userEmail: string
  userDisable: boolean
}

export interface UserTableProps {
  users: User[]
  toggleBlockUser: (userParam: ToggleBlockUserParam) => void
}

export interface User {
  _id: string
  email: string
  username: string
  avatar: string
  phone?: string
  deliveryAddress?: {
    address: string
    ward: string
    district: string
    city: string
  }
  disable: boolean
}
