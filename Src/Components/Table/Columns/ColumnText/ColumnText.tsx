import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'

import './style.sass'

interface ITextColumnProps {
  data: TableSpace.ITextCellData
}

export const ColumnText = ({ data }: ITextColumnProps) => {
  return <div className='w-full h-full column-text'>{data.text}</div>
}
