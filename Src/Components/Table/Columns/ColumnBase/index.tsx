import { ComponentChildren } from 'preact'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'

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
  const handleMouseEnter = () => {
    if (handleHoverEnter) handleHoverEnter()
  }

  const handleMouseLeave = () => {
    if (handleHoverLeave) handleHoverLeave()
  }

  return (
    <td
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`table-basecol ${hovered && 'table-basecol-hovered'} ${
        selected && 'table-basecol-selected'
      }`}
    >
      {children}
    </td>
  )
}
