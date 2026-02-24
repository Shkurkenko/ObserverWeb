import { useCallback, useState, useEffect } from 'preact/hooks'
import { MenubarModel } from '@Components/Menubar/Menubar.config'
import { Menubar } from '@Components/Menubar'
import { SlideSidebar } from '..'
import { useSidebar } from '../Hooks/UseSidebar'
import { MenubarConfig } from '@Components/Menubar/Menubar.config'
import { Box } from '@Components/Layouts/Box'
import { AlertLevel, useAlerts } from '@Components/Alerts'

export const testJournalAlerts = [
  {
    id: '09i98sdfs',
    header: 'Test Event Error',
    type: AlertLevel.Error,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdf',
    header: 'Test Event Warning',
    type: AlertLevel.Warning,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: 'asdfaa',
    header: 'Test Event Info',
    type: AlertLevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98saaadfdfssdssssdsdfss',
    header: 'Test Event ',
    type: AlertLevel.Success,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdshdjfkjsdfsssss',
    header: 'Test Event Info',
    type: AlertLevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },

  {
    id: '09i98sdfs2398hnjsjkldf',
    header: 'Test Event Error',
    type: AlertLevel.Error,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdf110-0sdf',
    header: 'Test Event Warning',
    type: AlertLevel.Warning,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: 'asdfaa-02348===',
    header: 'Test Event Info',
    type: AlertLevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98saaadfdfssdssssdsdfss=2345872',
    header: 'Test Event ',
    type: AlertLevel.Success,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
  {
    id: '09i98sdfssdshdjfkjsdfsssssaholikd',
    header: 'Test Event Info',
    type: AlertLevel.Info,
    message:
      'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
    show: true,
    ttl: 3000,
  },
]

export function SideNavigation() {
  const { addAlert } = useAlerts()
  const [menubarModel, setMenubarModel] = useState<MenubarModel>(MenubarConfig)
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
    setMenubarModel((prev: MenubarModel) => ({
      ...prev,
      currentIndex: index,
    }))
  }, [])

  const setActiveTab = useCallback((index: number) => {
    setMenubarModel((prev: MenubarModel) => ({
      ...prev,
      items: prev.items.map((item: MenubarModel) =>
        item.currentIndex === index ? { ...item, active: true } : { ...item, active: false },
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
