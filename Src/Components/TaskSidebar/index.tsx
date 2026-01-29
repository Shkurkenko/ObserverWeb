// src/Components/TaskSidebar/index.tsx
import { ReoSpace } from '../../Shared/Interfaces/Reo.interface'
import { TaskSidebarItem } from './TaskSidebarItem'
import { AddTask } from './TaskSidebarItemAdd'
import { useTasks } from './Hooks/UseTasks'
import { useScanView } from '../../Hooks/UseScanView'
import { ScanConfigHelpers } from '../../../Utils/ScanConfigHelper'
import { SearchInput } from '../SearchInput'
import { useState, useMemo } from 'preact/hooks'


import './style.sass'

export function TaskSidebar() {
  const { tasks } = useTasks()
  const { addView, showView } = useScanView()
  const [searchQuery, setSearchQuery] = useState('')

  // Фильтрация задач по поиску
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(query) ||
        task.types.some((type) => type.toLowerCase().includes(query)) ||
        task.status.toLowerCase().includes(query),
    )
  }, [tasks, searchQuery])

  const handleTaskClick = (task: ReoSpace.IScanTask) => {
    // При клике на задачу создаем вьюшки для всех типов сетей в задаче
    task.types.forEach((networkType, index) => {
      const viewConfig = ScanConfigHelpers.createScanViewConfig(
        networkType,
        task.id,
        `${task.id}-${networkType}-${index}`,
      )

      // Создаем вьюшку с данными
      addView({
        viewId: viewConfig.viewId,
        taskId: task.id,
        headerString: task.name,
        show: index === 0, // Показываем только первый тип сети
        tabsModel: [
          {
            id: ,
            label: networkType as string,
            icon: ScanConfigHelpers.getIconForNetworkType(networkType),
            badge: 0,
            data: {
              metaInfo: {
                scanType: networkType,
                scanStatus: task.status,
                currentScanCycle: task.currentScanCycle,
              },
              rows: [],
              hasNewData: false,
            },
          },
        ],
      })
    })

    // Показываем первую вьюшку
    if (task.types.length > 0) {
      showView(`${task.id}-${task.types[0]}-0`)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className='task-sidebar h-full w-full flex flex-col'>
      {/* Заголовок */}
      <div className='p-4 border-b border-outline-variant/50'>
        <h3 className='text-lg font-semibold text-on-surface'>Задачи сканирования</h3>
        <p className='text-sm text-on-surface-variant mt-1'>
          {tasks.length} задач, {filteredTasks.length} отфильтровано
        </p>
      </div>

      {/* Поиск */}
      <div className='p-5'>
        <SearchInput onSearch={handleSearch} />
      </div>

      {/* Кнопка добавления */}
      <div className='px-4 pb-4'>
        <AddTask />
      </div>

      {/* Список задач */}
      <div className='task-list-container flex-1 overflow-y-auto'>
        {filteredTasks.length === 0 ? (
          <div className='p-8 text-center'>
            <div className='text-4xl mb-3 opacity-50'>📋</div>
            <p className='text-on-surface-variant'>
              {searchQuery ? 'Задачи не найдены' : 'Нет задач сканирования'}
            </p>
            {!searchQuery && (
              <p className='text-sm text-on-surface-variant/70 mt-2'>
                Создайте новую задачу для начала работы
              </p>
            )}
          </div>
        ) : (
          <ul className='task-list'>
            {filteredTasks.map((task: ReoSpace.IScanTask) => (
              <TaskSidebarItem key={task.id} task={task} onClick={() => handleTaskClick(task)} />
            ))}
          </ul>
        )}
      </div>

      {/* Статус бар */}
      <div className='p-3 border-t border-outline-variant/50 bg-surface-container text-xs text-on-surface-variant'>
        <div className='flex justify-between'>
          <span>Активных: {tasks.filter((t) => t.status === 'running').length}</span>
          <span>Всего: {tasks.length}</span>
        </div>
      </div>
    </div>
  )
}
