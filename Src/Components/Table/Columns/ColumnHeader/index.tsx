import { useCallback, useState } from 'preact/hooks'
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
  const [currentState, setCurrentState] = useState(0)

  const handleColumnHeaderClick = useCallback(() => {
    setCurrentState((prevCount) => (prevCount + 1) % 3)
    console.log(currentState)
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

  return (
    <td
      className='table-header-column hover:bg-surface-container-highest select-none'
      onClick={() => {
        handleColumnHeaderClick()
      }}
    >
      <div className='header-cell-content w-full flex items-center'>
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
    </td>
  )
}
