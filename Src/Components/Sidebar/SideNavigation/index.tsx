import { useCallback, useState, useEffect } from 'preact/hooks'
import { IMenubarModel } from '../../Menubar'
import { Menubar } from '../../Menubar'
import { IMenubarItem } from '../../Menubar/MenubarItem'
import { SlideSidebar } from '..'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { useSidebar } from '../Hooks/UseSidebar'
import { IMenubarSetup } from '../../../Shared/Interfaces/Main.interface'

const DEFAULT_MENUBAR_CONFIG: IMenubarModel = {
  currentIndex: 0,
  items: [
    {
      id: 0,
      role: IMenubarSetup.TaskManager,
      active: false,
      icon: (
        <svg
          class='w-9 h-9 text-on-background'
          aria-hidden='true'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M6 6h8m-8 4h12M6 14h8m-8 4h12'
          />
        </svg>
      ),
      content: <div>Task Manager Content</div>,
    },
    {
      id: 1,
      role: IMenubarSetup.Notifications,
      active: false,
      icon: (
        <svg
          class='w-6 h-6 text-on-background'
          aria-hidden='true'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z'
          />
        </svg>
      ),
      content: <div>Notifications Content</div>,
    },
  ],
}

export function SideNavigation() {
  const [menubarModel, setMenubarModel] = useState<IMenubarModel>(DEFAULT_MENUBAR_CONFIG)
  const { show, showSidebar, hideSidebar } = useSidebar()

  useEffect(() => {
    if (ObserverConfig?.MenubarConfig?.items) {
      setMenubarModel(ObserverConfig.MenubarConfig)
    } else {
      console.warn('ObserverConfig.MenubarConfig не найден, используется дефолтная конфигурация')
      setMenubarModel(DEFAULT_MENUBAR_CONFIG)
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

  const currentContent = menubarModel.items[menubarModel.currentIndex]?.content || (
    <div>Контент не найден</div>
  )

  return (
    <div className='menubar-container'>
      <Menubar model={menubarModel} itemOnClick={menubarHandleClick} />
      <SlideSidebar>{currentContent}</SlideSidebar>
    </div>
  )
}
