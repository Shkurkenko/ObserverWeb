import { useCallback, useState, useEffect } from 'preact/hooks'
import { IMenubarModel } from '../../Menubar'
import { Menubar } from '../../Menubar'
import { IMenubarItem } from '../../Menubar/MenubarItem'
import { SlideSidebar } from '..'
import { useSidebar } from '../Hooks/UseSidebar'
import { MenubarConfig } from '../../../../Config/ObserverConfig'
import { Box } from '../../Layouts/Box'
import { useAlerts } from '../../Alerts/Hooks/UseAlerts'
import { AlertsSpace } from '../../../Shared/Interfaces/Alerts.interface'

export const testJournalAlerts = [
  {
    id: '09i98sdfs',
    header: 'Test Event Error',
    type: AlertsSpace.ILevel.Error,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdf',
    header: 'Test Event Warning',
    type: AlertsSpace.ILevel.Warning,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: 'asdfaa',
    header: 'Test Event Info',
    type: AlertsSpace.ILevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98saaadfdfssdssssdsdfss',
    header: 'Test Event ',
    type: AlertsSpace.ILevel.Success,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdshdjfkjsdfsssss',
    header: 'Test Event Info',
    type: AlertsSpace.ILevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },

  {
    id: '09i98sdfs2398hnjsjkldf',
    header: 'Test Event Error',
    type: AlertsSpace.ILevel.Error,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdf110-0sdf',
    header: 'Test Event Warning',
    type: AlertsSpace.ILevel.Warning,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: 'asdfaa-02348===',
    header: 'Test Event Info',
    type: AlertsSpace.ILevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98saaadfdfssdssssdsdfss=2345872',
    header: 'Test Event ',
    type: AlertsSpace.ILevel.Success,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdshdjfkjsdfsssssaholikd',
    header: 'Test Event Info',
    type: AlertsSpace.ILevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
]

export function SideNavigation() {
  const { addAlert } = useAlerts()
  const [menubarModel, setMenubarModel] = useState<IMenubarModel>(MenubarConfig)
  const { show, showSidebar, hideSidebar } = useSidebar()

  useEffect(() => {
    for (const alert of testJournalAlerts) {
      addAlert(alert)
    }
  }, [])

  useEffect(() => {
    if (MenubarConfig.items) {
      setMenubarModel(MenubarConfig)
    } else {
      console.warn('MenubarConfig не найден, используется дефолтная конфигурация')
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
      <Box className='menubar-container'>
        <Box className='error-message p-4 text-red-500'>Ошибка: нет доступных элементов меню</Box>
      </Box>
    )
  }

  const CurrentContent = () =>
    menubarModel.items[menubarModel.currentIndex]?.content || <div>Контент не найден</div>

  return (
    <Box className='menubar-container'>
      <Menubar model={menubarModel} itemOnClick={menubarHandleClick} />
      <SlideSidebar>
        <CurrentContent />
      </SlideSidebar>
    </Box>
  )
}
