import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { useTable } from '../Hooks/UseTable'
import { TableHeader } from '../TableHeader'
import { TableBody } from '../TableBody'
import { useEffect } from 'preact/hooks'

import './style.sass'

interface ITableContainerProps {
  columns: TableSpace.IColumn[]
  records: TableSpace.IRow[]
  customEmpty?: () => preact.JSX.Element
}

export function TableContainer({ columns, records, customEmpty }: ITableContainerProps) {
  const { renderEmpty } = useTable()

  const checkColumnsRowsValidCount = () => {
    for (const row of records) {
      if (columns.length !== row.columns.length) {
        throw Error('Invalid row and columns count need to be equal!')
      }
    }
  }

  useEffect(() => {
    try {
      checkColumnsRowsValidCount()
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div
      className='table-viewport w-full overflow-auto 
  overflow-y-auto'
    >
      <div className='reo-data-table w-full'>
        <TableHeader headerColumns={columns} />
        {records.length !== 0 ? (
          <TableBody rows={records} />
        ) : customEmpty ? (
          customEmpty()
        ) : (
          renderEmpty()
        )}
      </div>
    </div>
  )
}
