import { useCallback, useState, useEffect } from 'preact/hooks'
import { IMenubarModel } from '../../Menubar'
import { Menubar } from '../../Menubar'
import { IMenubarItem } from '../../Menubar/MenubarItem'
import { SlideSidebar } from '..'
import { useSidebar } from '../Hooks/UseSidebar'
import { MenubarConfig } from '../../../../Config/ObserverConfig'

export function SideNavigation() {
  const [menubarModel, setMenubarModel] = useState<IMenubarModel>(MenubarConfig)
  const { show, showSidebar, hideSidebar } = useSidebar()

  useEffect(() => {
    if (MenubarConfig.items) {
      setMenubarModel(MenubarConfig)
    } else {
      console.warn('ObserverConfig.MenubarConfig не найден, используется дефолтная конфигурация')
      setMenubarModel(MenubarConfig)
    }
  }, [])

  const loadContent = useCallback((index: number) => {
    setMenubarModel((prev: IMenubarModel) => ({
      ...prev,
      currentIndex: index,
    }))
  }, [])

  const setActiveTab = useCallback((index: number) => {
    setMenubarModel((prev: IMenubarModel) => ({
      ...prev,
      items: prev.items.map((item: IMenubarItem) =>
        item.id === index ? { ...item, active: true } : { ...item, active: false },
      ),
      currentIndex: index,
    }))
  }, [])

  const menubarHandleClick = useCallback(
    (clickedIndex: number): void => {
      // Устанавливаем активную вкладку
      setActiveTab(clickedIndex)

      // Управляем сайдбаром
      if (!show) {
        showSidebar()
      } else if (clickedIndex === menubarModel.currentIndex) {
        // Если кликнули на уже активную вкладку, скрываем сайдбар
        hideSidebar()
      }

      loadContent(clickedIndex)
    },
    [show, menubarModel.currentIndex, showSidebar, hideSidebar, loadContent, setActiveTab],
  )

  if (!menubarModel?.items || menubarModel.items.length === 0) {
    return (
      <div className='menubar-container'>
        <div className='error-message p-4 text-red-500'>Ошибка: нет доступных элементов меню</div>
      </div>
    )
  }

  const CurrentContent = () =>
    menubarModel.items[menubarModel.currentIndex]?.content || <div>Контент не найден</div>

  return (
    <div className='menubar-container'>
      <Menubar model={menubarModel} itemOnClick={menubarHandleClick} />
      <SlideSidebar>
        <CurrentContent />
      </SlideSidebar>
    </div>
  )
}
