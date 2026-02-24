import { Box } from '@Components/Layouts/Box'
import { Text } from '@Components/Typography'
import { ReoCountryCellData } from '@Shared/Interfaces/Reo.interface'

import { cn } from '@Utils/Helpers'

import '/node_modules/flag-icons/css/flag-icons.min.css' // TODO: create patch for this file with only neighbors and needed icons. For now it costs too much space
import './style.sass'
export interface ColumnCountryProps {
  data: ReoCountryCellData
  className?: string
}

export const ColumnCountry = ({ data, className = '' }: ColumnCountryProps) => {
  return (
    <Box className={cn(className, 'w-full h-full column-country')}>
      <Box className='column-country-name'>
        <Text bold={true}>{data.name}</Text>
      </Box>
      <Box className='column-country-icon'>
        <Box class={`fi fi-${data.countryAbb.toLowerCase()}`}></Box>
      </Box>
    </Box>
  )
}
