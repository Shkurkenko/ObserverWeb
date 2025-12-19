import { ComponentChildren } from 'preact'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { useTable } from '../../Hooks/UseTable'

import './style.sass'

interface IColumnBaseProps {
  position: TableSpace.IPoint
  children?: ComponentChildren
  hovered?: boolean
  selected?: boolean
  handleHoverEnter?: Function
  handleHoverLeave?: Function
}

export function ColumnBase({
  children,
  position,
  hovered,
  selected,
  handleHoverEnter,
  handleHoverLeave,
}: IColumnBaseProps) {
  const { columns } = useTable()

  const handleMouseEnter = () => {
    if (handleHoverEnter) handleHoverEnter()
  }

  const handleMouseLeave = () => {
    if (handleHoverLeave) handleHoverLeave()
  }

  const getColumnWidth = () => {
    if (!columns[position.colIndex] || columns[position.colIndex] === null) return { flex: 1 }
    return columns[position.colIndex].width
      ? {
          width: columns[position.colIndex].width?.toString() + 'px',
        }
      : { flex: 1 }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...getColumnWidth(),
      }}
      className={`table-basecol`}
    >
      {children}
    </div>
  )
}
