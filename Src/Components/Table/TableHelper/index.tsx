import { useState } from 'preact/hooks'
import { generateCsv, mkConfig, download } from 'export-to-csv'
import { useTable } from '../Hooks/UseTable'
import { Button } from '../../Button'

import './style.sass'

export function TableHelper() {
  const [currentCycle, setCurrentCycle] = useState<number>(4)
  const { rows, columns, clearRows } = useTable()
  const csvConfig = mkConfig({ useKeysAsHeaders: true })

  const clearCycles = () => {
    setCurrentCycle(0)
  }

  const handleSaveFileButtonClick = () => {
    try {
      const csv = generateCsv(csvConfig)(getValidData())
      download(csvConfig)(csv)
    } catch (error) {
      console.error(error)
    }
  }

  const emptyTable = () => {
    clearRows()
    clearCycles()
  }

  function getValidData() {
    const resultData: any = []

    // Note: Think about generic implementation later

    // for (let i = 0; i < rows.length; i++) {
    //   const rowData = {}
    //   for (let j = 1; j < rows[i].columns.length; j++) {
    //     const column = rows[i].columns[j]
    //     if (headers[j - 1] !== undefined) {
    //       const currentHeaderName = headers[j - 1].label
    //       if (column.data) {
    //         rowData[currentHeaderName] = column.data.text
    //       } else if (column.data.name) {
    //         rowData[currentHeaderName] = column.data.name
    //       } else {
    //         rowData[currentHeaderName] = 'undefined'
    //         console.log('Warning from TableHelper Component: Cannot parse unknown table type data')
    //       }
    //     }
    //   }
    //   resultData.push(rowData)
    // }

    return resultData
  }

  return (
    <div className='table-helper'>
      <ul className='table-helper-list'>
        <li className='table-helper-item'>
          <div className='scan-info'>
            <h5 className='scan-count-label text-on-background'>
              Всего результатов:
              <span className='scan-count ml-1'>{rows.length}</span>
            </h5>
          </div>
        </li>
        <li className='table-helper-item'>
          <div className='scan-info'>
            <h5 className='scan-count-label text-on-background'>
              Циклов: <span className='scan-count ml-1'>{currentCycle}</span>
            </h5>
          </div>
        </li>
        <li className='table-helper-item'>
          <Button
            isDisabled={rows.length === 0}
            onClicked={handleSaveFileButtonClick}
            iconElement={
              <svg
                class='w-3.5 h-3.5 text-on-primary'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 16 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3'
                />
              </svg>
            }
          />
          <Button
            onClicked={emptyTable}
            iconElement={
              <svg
                class='w-3.5 h-3.5 text-on-primary'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                />
              </svg>
            }
            additionalClasses='ml-3'
          />
        </li>
      </ul>
    </div>
  )
}
