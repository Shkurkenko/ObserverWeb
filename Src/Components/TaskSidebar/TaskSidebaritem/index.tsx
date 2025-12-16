import { useCallback } from 'preact/hooks'
import { useScanView } from '../../../Hooks/UseScanView'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ScanLightStatus } from '../../../Views/Components/ScanLightStatus'

import './style.sass'

interface TaskSidebarItem {
  task: ReoSpace.IScanTask
}

export function TaskSidebarItem({ task }: TaskSidebarItem) {
  const { showView } = useScanView()

  const loadTaskContent = useCallback(() => {
    showView(task.id)
  }, [])

  return (
    <li key={task.name} className='task-item' onClick={loadTaskContent}>
      <div className='task-item-header pr-8'>
        <div className='task-item-left-side flex'>
          <div className='task-item-header-more-button'>
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
                stroke-width='2'
                d='M12 6h.01M12 12h.01M12 18h.01'
              />
            </svg>
          </div>

          <div className='scan-light-container ml-5'>
            <ScanLightStatus statusType={task.status} />
          </div>

          <div className='task-item-text-info'>
            <div className='task-name'>{task.name}</div>
            <div className='scan-time-info flex'>
              <div className='scan-time-icon flex mr-1.5'>
                <svg
                  class='w-4 h-4 text-gray-800 dark:text-white'
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
                    d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </div>
              <div className='scan-date text-on-background'>{task.date}</div>
              <div className='scan-time text-on-background ml-2'>{task.time}</div>
            </div>
          </div>
        </div>

        <div className='scan-types'>
          {task.types.map((type: ReoSpace.IScanTypes, index: number) => (
            <div key={index} className='scan-type-label'>
              {type}
            </div>
          ))}
        </div>

        <div className='task-item-expand'>
          <svg
            class='w-4 h-4 text-gray-800 dark:text-white'
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
              d='m9 5 7 7-7 7'
            />
          </svg>
        </div>
      </div>
    </li>
  )
}
