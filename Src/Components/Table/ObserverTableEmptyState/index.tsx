import './style.sass'

export function ObserverTableEmpty() {
  return (
    <div className='observer-empty-table-container'>
      <div className='observer-empty-table-container-content'>
        <div className='observer-empty-table-header'>
          <div className='observer-empty-table-header-icon shadow-lg'>
            <svg
              class='w-14 h-14 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-width='2'
                d='M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z'
              />
            </svg>
          </div>
          <div className='observer-empty-table-header-text'>
            <h1>Добавьте сканирование</h1>
            <p>
              Добавьте новое сканирование и запустите его, после чего здесь будет таблица данных.
            </p>
          </div>
        </div>
        <div className='observer-empty-table-panel'>
          <div className='select-scan-types'>
            <div className='scan-label-add'>GSM</div>
            <div className='scan-label-add'>UMTS</div>
            <div className='scan-label-add'>LTE</div>
            <div className='scan-label-add'>Bluetooth</div>
            <div className='scan-label-add'>WiFi</div>
            <div className='scan-label-add'>5G</div>
          </div>
        </div>
      </div>

      <button
        className='add-new-scan-button mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
        type='button'
      >
        <div className='add-new-scan-button-content flex items-center'>
          <div className='add-new-scan-button-content-icon'>
            <svg
              class='w-6 h-6 text-gray-800 dark:text-white'
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
          <div className='add-new-scan-button-content-text ml-2'>Добавить</div>
        </div>
      </button>
    </div>
  )
}
