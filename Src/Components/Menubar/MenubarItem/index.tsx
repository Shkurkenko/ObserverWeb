import { ComponentType } from 'preact'
import { IMenubarSetup } from '../../../Shared/Interfaces/Main.interface'

import './style.sass'

export interface IMenubarItemProps {
  data: any
  itemOnClick: Function
  isActive: boolean
}

export interface IMenubarItem {
  id: number
  active: boolean
  role: IMenubarSetup
  icon: ComponentType
  content: ComponentType
}

export function MenubarItem({ data, itemOnClick, isActive }: IMenubarItemProps) {
  return (
    <li
      key={data.id}
      onClick={() => {
        itemOnClick(data.id)
      }}
      className={`menubar-list-item task-toggle ${isActive ? 'menubar-active' : ''}`}
    >
      {data.icon}
    </li>
  )
}
