import { ComponentChildren } from 'preact'
import { MenubarSetup } from '../../../../Config/ObserverConfig'

import './style.sass'

export interface IMenubarItemProps {
  data: any
  itemOnClick: Function
  isActive: boolean
}

export interface MenubarItemConfig {
  id: number
  active: boolean
  role: MenubarSetup
  icon: ComponentChildren
  content: ComponentChildren
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
