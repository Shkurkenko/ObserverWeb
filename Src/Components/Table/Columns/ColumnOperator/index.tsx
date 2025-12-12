import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'

import './style.sass'

export interface IColumnOperatorProps {
  iconPath?: string
  data: TableSpace.IOperatorCellData
}

const operatorTestCircles: Record<string, JSX.Element> = {
  mts: <div className={'operator-circle mts-operator-circle'}></div>,
  tele2: <div className={'operator-circle tele2-operator-circle'}></div>,
  beeline: <div className={'operator-circle beeline-operator-circle'}></div>,
  megafone: <div className={'operator-circle megafone-operator-circle'}></div>,
  default: <div className={'operator-circle'}></div>,
}

export const ColumnOperator = ({ iconPath, data }: IColumnOperatorProps) => {
  return (
    <div className='operator-column-container flex items-center'>
      <div className='w-full h-full column-operator'>{data.name}</div>
      <div className='operator-icon mr-2 ml-2'>
        {
          operatorTestCircles[
            data.name && data.name.toLocaleLowerCase() in operatorTestCircles
              ? data.name.toLowerCase()
              : 'default'
          ]
        }
      </div>
    </div>
  )
}
