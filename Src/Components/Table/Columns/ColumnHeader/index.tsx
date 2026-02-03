import { useCallback, useRef, useState } from 'preact/hooks'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { Flex } from '../../../Layouts/Flex'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

export interface IColumnHeaderProps {
  header: TableSpace.IColumn
  className?: string
}

const arrowAngleClassStates = {
  down: 'rotate-90 mb-4',
  up: 'rotate-270 mt-6',
  hidden: 'hidden',
}

export function ColumnHeader({ header, className = '' }: IColumnHeaderProps) {
  const headerRef = useRef<null>(null)
  const [currentState, setCurrentState] = useState(0)

  const handleColumnHeaderClick = useCallback(() => {
    setCurrentState((prevCount) => (prevCount + 1) % 3)
  }, [])

  const getRotationAngle = useCallback(() => {
    switch (currentState) {
      case 0:
        return arrowAngleClassStates.hidden
      case 1:
        return arrowAngleClassStates.up
      case 2:
        return arrowAngleClassStates.down
      default:
        return 'Ureachable'
    }
  }, [currentState])

  const getColumnWidth = () => {
    return header.width ? { width: `${header.width}px` } : { flex: 1 }
  }

  return (
    <Flex
      className={cn(
        className,
        `table-header-column h-full`,
        `bg-surface-container-high`,
        `hover:bg-surface-container-highest select-none`,
      )}
      ref={headerRef}
      style={{
        ...getColumnWidth(),
      }}
      onClick={() => {
        handleColumnHeaderClick()
      }}
    >
      <Flex align='center' justify='around' className='header-cell-content w-full'>
        <b className='truncate'>{header.label}</b>
        <div className={`header-cell-icon ${getRotationAngle()}`}>
          <svg
            class='w-4 h-4 text-on-background ml-5'
            aria-hidden='true'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m9 5 7 7-7 7'
            />
          </svg>
        </div>
      </Flex>
    </Flex>
  )
}
