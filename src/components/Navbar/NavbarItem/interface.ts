import { MouseEventHandler } from 'react'

export interface NavbarItemProps {
  to: string
  display: string
  icon: string
  isActive: boolean
  onClick: MouseEventHandler
}
