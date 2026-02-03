import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { Box } from '../../../Layouts/Box'
import { cn } from '../../../../Utils/Helpers'

import '/node_modules/flag-icons/css/flag-icons.min.css' // TODO: create patch for this file with only neighbors and needed icons. For now it costs too much space
import './style.sass'

interface IColumnCountryProps {
  data: TableSpace.ICountryCellData
  className?: string
}

export const ColumnCountry = ({ data, className = '' }: IColumnCountryProps) => {
  return (
    <Box className={cn(className, 'w-full h-full column-country')}>
      <Box className='column-country-name'>
        <b>{data.name}</b>
      </Box>
      <Box className='column-country-icon'>
        <Box class={`fi fi-${data.countryAbb.toLowerCase()}`}></Box>
      </Box>
    </Box>
  )
}
