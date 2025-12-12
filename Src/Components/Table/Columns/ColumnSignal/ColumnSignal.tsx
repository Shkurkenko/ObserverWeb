import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { SignalStrength } from '../../../SignalStrength'

import './style.sass'

interface ISignalColumnProps {
  data: TableSpace.ISignalCellData
}

export const ColumnSignal = ({ data }: ISignalColumnProps) => {
  return (
    <div className='column-signal w-full h-full'>
      <b className='mr-3'>{data.value}</b>
      <SignalStrength width={45} height={24} dbm={data.value} />
    </div>
  )
}
