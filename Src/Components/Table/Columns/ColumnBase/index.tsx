import { ComponentChildren } from 'preact'
import { useTable } from '@Components/Table/Hooks/UseTable'
import { TablePoint } from '@Components/Table/Table.types'
import { Box } from '@Components/Layouts/Box'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface ColumnBaseProps {
  position: TablePoint

  children?: ComponentChildren

  hovered?: boolean

  selected?: boolean

  handleHoverEnter?: Function

  handleHoverLeave?: Function

  className?: string
}

export function ColumnBase({
  children,
  position,
  hovered,
  selected,
  handleHoverEnter,
  handleHoverLeave,
  className = '',
}: ColumnBaseProps) {
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
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...getColumnWidth(),
      }}
      className={cn(className, `table-basecol`)}
    >
      {children}
    </Box>
  )
}
