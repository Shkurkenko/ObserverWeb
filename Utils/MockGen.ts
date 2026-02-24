import { MockOperators } from '../../Data/TableData'
import { MockCountries } from '../../Data/TableData'

// import {
//   TableCell,
//   TableColumn,
//   TableColumnType,
//   TableEnumCellData,
//   TableRowData,
//   TableRowStatus,
//   TableRowStatusType,
//   TableRowVariant,
//   TableRowVariantType,
//   TableTextCellData,
// } from '@Components/Table/Table.types'
import {
  ReoCountryCellData,
  ReoOperatorCellData,
  ReoScanStatus,
  ReoScanTask,
  ReoScanVariant,
  ReoScanVariantType,
  ReoSignalCellData,
} from '@Shared/Interfaces/Reo.interface'
import { getCurrentDDMMYY, getRandomEnumValue, getRandomIntegerInclusive } from './Helpers'

import { v4 as uuidv4 } from 'uuid'

export const getRandomOperatorCellData = (): ReoOperatorCellData => {
  return MockOperators[getRandomIntegerInclusive(0, MockOperators.length - 1)]
}

export const getRandomCountryCellData = (): ReoCountryCellData => {
  return MockCountries[getRandomIntegerInclusive(0, MockCountries.length - 1)]
}

export const getRandomRowStatus = (): TableRowStatusType => {
  return Object.values(TableRowStatus)[
    getRandomIntegerInclusive(0, Object.values(TableRowStatus).length - 1)
  ]
}

export const getRandomRowType = (): TableRowVariantType | string => {
  return Object.values(TableRowVariant)[
    getRandomIntegerInclusive(0, Object.values(TableRowVariant).length - 1)
  ]
}

export const generateRandomUniqueScanTypes = (): ReoScanVariantType[] => {
  const randomLength = getRandomIntegerInclusive(1, Object.values(ReoScanVariant).length)
  const selectedTypes: Set<ReoScanVariantType> = new Set()

  while (selectedTypes.size < randomLength) {
    const randomType =
      Object.values(ReoScanVariant)[
        getRandomIntegerInclusive(0, Object.values(ReoScanVariant).length - 1)
      ]
    selectedTypes.add(randomType)
  }

  return Array.from(selectedTypes)
}

export const generateMockTask = (index: number): ReoScanTask => {
  return {
    id: uuidv4() as string,
    name: `Сканирование #${index + 1}`,
    createdAt: getCurrentDDMMYY(),
    types: generateRandomUniqueScanTypes(),
    status: getRandomEnumValue(ReoScanStatus),
    duration: 0,
  }
}

export const generateReoRow = (
  rowIndex: number,
  columnsPattern: TableColumnType[],
): TableRowData => {
  const columns: TableCell<unknown>[] = columnsPattern.map((colType, index) => {
    const position = { rowIndex, colIndex: index }

    switch (colType) {
      case TableColumn.Enum:
        return {
          position,
          type: TableColumn.Enum,
          data: { rowIndex: index },
        } as TableCell<TableEnumCellData>
      case TableColumn.Operator:
        const operator = getRandomOperatorCellData()
        return {
          position,
          type: TableColumn.Operator,
          data: operator,
        } as TableCell<ReoOperatorCellData>
      case TableColumn.Country:
        const country = getRandomCountryCellData()
        return {
          position,
          type: TableColumn.Country,
          data: country,
        } as TableCell<ReoCountryCellData>
      case TableColumn.Text:
        return {
          position,
          type: TableColumn.Text,
          data: { text: `${getRandomIntegerInclusive(1, 100)}` },
        } as TableCell<TableTextCellData>
      case TableColumn.Signal:
        return {
          position,
          type: TableColumn.Signal,
          data: {
            range: {
              beginValue: -110,
              endValue: -30,
            },
            value: getRandomIntegerInclusive(-110, -30),
          },
        } as TableCell<ReoSignalCellData>
      default:
        return {
          position,
          type: colType,
          data: null,
        } as TableCell<unknown>
    }
  })

  return {
    index: rowIndex,
    columns,
    status: getRandomRowStatus(),
    type: getRandomRowType() as TableRowVariantType,
  }
}

export const generateMockReoTableData = (
  rowCount: number,
  columnsPattern: TableColumnType[],
): TableRowData[] => {
  const rows: TableRowData[] = []
  for (let i = 0; i < rowCount; i++) {
    const newRow = generateReoRow(i, columnsPattern)
    rows.push(newRow)
  }
  return rows
}

export const generateMockScanTasks = (count: number): ReoScanTask[] => {
  const tasks: ReoScanTask[] = []

  for (let i = 0; i < count; i++) {
    const newTask = generateMockTask(i)
    tasks.push(newTask)
  }

  console.log('mock tasks: ', tasks)

  return tasks
}

export const processRowAddition = (interval: number, count: number, addRow: Function) => {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      addRow(
        generateReoRow(i, [
          TableColumn.Enum,
          TableColumn.Checkbox,
          TableColumn.Text,
          TableColumn.Country,
          TableColumn.Operator,
          TableColumn.Signal,
          TableColumn.Text,
          TableColumn.Text,
          TableColumn.Text,
          TableColumn.Text,
        ]),
      )
    }, i * interval)
  }
}
