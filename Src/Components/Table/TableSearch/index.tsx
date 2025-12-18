import './style.sass'

export function TableSearch() {
  return (
    <div className='reo-scan-search'>
      <div class='w-full min-w-50'>
        <div class='table-search-component flex items-center relative'>
          <div className='table-search-input-container w-full flex items-center'>
            <div className='w-6 h-6 table-search-component-icon ml-5'>
              <svg viewBox='0 0 24 24' fill='currentColor' class='w-6 h-6 text-slate-600'>
                <path
                  fill-rule='evenodd'
                  d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
            <div className='table-search-input-container w-full'>
              <input
                class='table-search-input w-full bg-surface-container placeholder:text-on-surface-container-high text-lg pl-16 pr-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow'
                placeholder='Поиск по таблице'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
