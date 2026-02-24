import { Flex } from '@Components/Layouts/Flex'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface ColumnCheckBoxProps {
  className?: string
}

export const ColumnCheckbox = ({ className = '' }: ColumnCheckBoxProps) => {
  return (
    <Flex align='center' class={cn(className, 'table-checkbox')}>
      {/* <input
        id='default-checkbox'
        type='checkbox'
        value=''
        class='w-6 h-6 border border-default-medium rounded-xs bg-[#0d1014] focus:ring-2 focus:ring-brand-soft'
      /> */}
      <label for='default-checkbox' class='select-none ms-2 text-sm font-medium text-heading'>
        Default checkbox
      </label>
    </Flex>
  )
}
