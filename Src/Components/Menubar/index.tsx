import { useSidebar } from '../Sidebar/Hooks/UseSidebar'
import { IMenubarItem, MenubarItem } from './MenubarItem'

import './style.sass'

interface IMenubarProps {
  model: IMenubarModel
  itemOnClick: Function
}
export interface IMenubarModel {
  currentIndex: number
  items: IMenubarItem[]
}

export function Menubar({ model, itemOnClick }: IMenubarProps) {
  const { show } = useSidebar()

  return (
    <div className='menubar'>
      <ul className='menubar-list w-full'>
        {model.items.map((menubarItem: IMenubarItem) => (
          <MenubarItem
            data={menubarItem}
            isActive={show && model.currentIndex === menubarItem.id}
            itemOnClick={itemOnClick}
          />
        ))}
      </ul>
    </div>
  )
}
