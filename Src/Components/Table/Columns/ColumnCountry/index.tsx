import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'

import './style.sass'

interface IColumnCountryProps {
  data: TableSpace.ICountryCellData
}

export const ColumnCountry = ({ data }: IColumnCountryProps) => {
  return (
    <div className='w-full h-full column-country'>
      <div className='column-country-name'>
        <b>{data.name}</b>
      </div>
      <div className='column-country-icon'>
        <div class={`fi fi-${data.countryAbb.toLowerCase()}`}></div>
      </div>
    </div>
  )
}
