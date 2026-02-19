import { useSidebar } from '../Sidebar/Hooks/UseSidebar'
import { IMenubarItem, MenubarItem } from './MenubarItem'

import './style.sass'

interface MenubarProps {
  model: MenubarModel
  itemOnClick: Function
}

import './style.sass'

export function Menubar({ model, itemOnClick }: MenubarProps) {
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
