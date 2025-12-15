import { h, Fragment } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { IMenubarModel } from '../../Menubar'
import { Menubar } from '../../Menubar'
import { IMenubarItem } from '../../Menubar/MenubarItem'
import { SlideSidebar } from '..'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { useSidebar } from '../Hooks/UseSidebar'

import './style.sass'

export function SideNavigation() {
  const [menubarModel, setMenubarModel] = useState<IMenubarModel>(ObserverConfig.MenubarConfig)
  const { show, showSidebar, hideSidebar } = useSidebar()

  const loadContent = useCallback((index: number) => {
    setMenubarModel((prev: IMenubarModel) => ({
      ...prev,
      currentIndex: index,
    }))
  }, [])

  const setActiveTab = useCallback((index: number) => {
    setMenubarModel((prev: IMenubarModel) => ({
      items: prev.items.map((item: IMenubarItem) =>
        item.id === index ? { ...item, active: true } : item,
      ),
      currentIndex: index,
    }))
  }, [])

  const menubarHandleClick = useCallback((clickedIndex: number): void => {
    if (!show) {
      showSidebar()
    }

    if (clickedIndex === menubarModel.currentIndex && show) {
      hideSidebar()
    }

    loadContent(clickedIndex)
  }, [])

  return (
    <div className='menubar-container'>
      <Menubar model={menubarModel} itemOnClick={menubarHandleClick} />
      <SlideSidebar>{menubarModel.items[menubarModel.currentIndex].content}</SlideSidebar>
    </div>
  )
}
