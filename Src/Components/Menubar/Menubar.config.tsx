import 

export interface MenubarModel {
  currentIndex: number
  items: IMenubarItem[]
}

export const MenubarConfig: MenubarModel = {
  currentIndex: 0,
  items: [
    {
      id: 0,
      role: MenubarSetup.TaskManager,
      active: false,
      icon: <BurgerIcon />,
      content: <TaskSidebar />,
    },
    {
      id: 1,
      role: MenubarSetup.Notifications,
      active: false,
      icon: <BellIcon />,
      content: <Journal />,
    },
  ],
}
