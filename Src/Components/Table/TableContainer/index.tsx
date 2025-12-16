import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { useTable } from '../Hooks/UseTable'
import { TableHeader } from '../TableHeader'
import { TableBody } from '../TableBody'

import './style.sass'
import { useEffect } from 'preact/hooks'

interface ITableContainerProps {
  columns: TableSpace.IColumn[]
  records: TableSpace.IRow[]
  customEmpty?: () => preact.JSX.Element
}

export function TableContainer({ columns, records, customEmpty }: ITableContainerProps) {
  const { renderEmpty } = useTable()

  const checkColumnsRowsValidCount = () => {
    for (const row of records) {
      console.log('row: ', row)
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
      <table className='reo-data-table w-full'>
        {records.length !== 0 && <TableHeader headers={columns} />}
        {records.length !== 0 ? (
          <TableBody rows={records} />
        ) : customEmpty ? (
          customEmpty()
        ) : (
          renderEmpty()
        )}
      </table>
    </div>
  )
}
