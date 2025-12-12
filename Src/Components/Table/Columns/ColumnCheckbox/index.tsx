import { h, Fragment } from 'preact'

import './style.sass'

export const ColumnCheckbox = () => {
  return (
    <div class='table-checkbox items-center mb-4'>
      {/* <input
        id='default-checkbox'
        type='checkbox'
        value=''
        class='w-6 h-6 border border-default-medium rounded-xs bg-[#0d1014] focus:ring-2 focus:ring-brand-soft'
      /> */}
      <label for='default-checkbox' class='select-none ms-2 text-sm font-medium text-heading'>
        Default checkbox
      </label>
    </div>
  )
}
