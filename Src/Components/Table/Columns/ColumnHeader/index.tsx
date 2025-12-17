import { MutableRef, useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useTable } from '../../Hooks/UseTable'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'

import './style.sass'

export interface IColumnHeaderProps {
  header: TableSpace.IColumn
}

const arrowAngleClassStates = {
  // Tailwind classes
  down: 'rotate-90 mb-4',
  up: 'rotate-270 mt-6',
  hidden: 'hidden',
}

export function ColumnHeader({ header }: IColumnHeaderProps) {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [currentState, setCurrentState] = useState(0)
  const { setHeaderRefs } = useTable()

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

  useEffect(() => {
    setHeaderRefs((prev) => [...prev, headerRef])
  }, [])

  return (
    <div
      className={`table-header-column h-full hover:bg-surface-container-highest select-none flex`}
      ref={headerRef}
      style={{
        ...getColumnWidth(),
      }}
      onClick={() => {
        handleColumnHeaderClick()
      }}
    >
      <div className='header-cell-content w-full flex items-center justify-around'>
        <b>{header.label}</b>
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
      </div>
    </div>
  )
}
