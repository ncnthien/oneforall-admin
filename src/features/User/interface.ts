export interface ToggleBlockUserParam {
  user: User
  userDisable: boolean
}

export interface UserTableProps {
  users: User[]
  toggleBlockUser: (userParam: ToggleBlockUserParam) => void
}

export interface User {
  address: string
  avatar: string
  email: string
  isAdmin: boolean
  isBlocked: boolean
  password: string
  phone: string
  username: string
  __v: number
  _id: string
}
