import './style.sass'

export function SearchInput() {
  return (
    <div className='task-content-search'>
      <div className='task-content-search-icon relative'>
        <div className='task-content-search-icon-container flex items-center'>
          <svg
            class='w-7 h-7 text-[#263240] dark:text-[#566679] absolute ml-5'
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
              d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
      </div>
      <div className='task-content-search-input-container w-full'>
        <input type='text' className='task-content-search-input' placeholder='Поиск по задачам' />
      </div>
    </div>
  )
}
