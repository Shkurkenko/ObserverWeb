import { useTasks } from '../Hooks/UseTasks'

import './style.sass'

export function AddTask() {
  const { addTask } = useTasks()

  return (
    <div className='new-task-container flex'>
      <div className='new-task-icon'>
        <svg
          class='w-6 h-6 text-[#9f9f9f] dark:text-[#9f9f9f]'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
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
            d='M5 12h14m-7 7V5'
          />
        </svg>
      </div>
      <div className='new-label ml-3'>
        <h2>Добавить новое сканирование</h2>
      </div>
    </div>
  )
}
