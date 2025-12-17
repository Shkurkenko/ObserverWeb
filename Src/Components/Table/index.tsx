import { TableContainer } from './TableContainer'
import { TableHelper } from './TableHelper'
import { TableSearch } from './TableSearch'
import { useTable } from './Hooks/UseTable'

import './style.sass'

export function Table() {
  const { columns, rows } = useTable()

  return (
    <div className='table-container relative w-full h-full flex flex-col'>
      <TableSearch />
      <TableHelper />
      <TableContainer columns={columns} records={rows} />
    </div>
  )
}
