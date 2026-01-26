import { ReoSpace } from '../Shared/Interfaces/Reo.interface'
import { TableSpace } from '../Shared/Interfaces/Table.interface'
import { MockOperators } from '../../Data/TableData'
import { MockCountries } from '../../Data/TableData'
import { getCurrentDDMMYY, getRandomEnumValue, getRandomIntegerInclusive } from './Helpers'

import { v4 as uuidv4 } from 'uuid'

export namespace MockGenHelpers {
  export const getRandomOperatorCellData = (): TableSpace.IOperatorCellData => {
    return MockOperators[getRandomIntegerInclusive(0, MockOperators.length - 1)]
  }

  export const getRandomCountryCellData = (): TableSpace.ICountryCellData => {
    return MockCountries[getRandomIntegerInclusive(0, MockCountries.length - 1)]
  }

  export const getRandomRowStatus = (): TableSpace.IRowStatus => {
    return Object.values(TableSpace.IRowStatus)[
      getRandomIntegerInclusive(0, Object.values(TableSpace.IRowStatus).length - 1)
    ]
  }

  export const getRandomRowType = (): TableSpace.IRowTypes | string => {
    return Object.values(TableSpace.IRowTypes)[
      getRandomIntegerInclusive(0, Object.values(TableSpace.IRowTypes).length - 1)
    ]
  }

  export const generateRandomUniqueScanTypes = (): ReoSpace.IScanTypes[] => {
    const randomLength = getRandomIntegerInclusive(1, Object.values(ReoSpace.IScanTypes).length)
    const selectedTypes: Set<ReoSpace.IScanTypes> = new Set()

    while (selectedTypes.size < randomLength) {
      const randomType = Object.values(ReoSpace.IScanTypes)[
        getRandomIntegerInclusive(0, Object.values(ReoSpace.IScanTypes).length - 1)
      ]
      selectedTypes.add(randomType)
    }

    return Array.from(selectedTypes)
  }

  export const generateMockTask = (index: number): ReoSpace.IScanTask => {
    return {
      id: uuidv4() as string,
      name: `Сканирование #${index + 1}`,
      createdAt: getCurrentDDMMYY(),
      currentScanCycle: getRandomIntegerInclusive(0, 10),
      types: generateRandomUniqueScanTypes(),
      status: getRandomEnumValue(ReoSpace.IScanStatusTypes),
      duration: 0,
    }
  }

  export const generateReoRow = (
    rowIndex: number,
    columnsPattern: TableSpace.IColumnTypes[],
  ): TableSpace.IRow => {
    // if (columnsPattern.length === 0) throw new Error('ColumnsPattern should not be empty')

    const columns: TableSpace.ICell<unknown>[] = columnsPattern.map((colType, index) => {
      const position = { rowIndex, colIndex: index }

      switch (colType) {
        case TableSpace.IColumnTypes.Enum:
          return {
            position,
            type: TableSpace.IColumnTypes.Enum,
            data: { rowIndex: index },
          } as TableSpace.ICell<TableSpace.IEnumCellData>
        case TableSpace.IColumnTypes.Operator:
          const operator = getRandomOperatorCellData()
          return {
            position,
            type: TableSpace.IColumnTypes.Operator,
            data: operator,
          } as TableSpace.ICell<TableSpace.IOperatorCellData>
        case TableSpace.IColumnTypes.Country:
          const country = getRandomCountryCellData()
          return {
            position,
            type: TableSpace.IColumnTypes.Country,
            data: country,
          } as TableSpace.ICell<TableSpace.ICountryCellData>
        case TableSpace.IColumnTypes.Text:
          return {
            position,
            type: TableSpace.IColumnTypes.Text,
            data: { text: `${getRandomIntegerInclusive(1, 100)}` },
          } as TableSpace.ICell<TableSpace.ITextCellData>
        case TableSpace.IColumnTypes.Signal:
          return {
            position,
            type: TableSpace.IColumnTypes.Signal,
            data: {
              range: {
                beginValue: -110,
                endValue: -30,
              },
              value: getRandomIntegerInclusive(-110, -30),
            },
          } as TableSpace.ICell<TableSpace.ISignalCellData>
        default:
          return {
            position,
            type: colType,
            data: null,
          } as TableSpace.ICell<unknown>
      }
    })

    return {
      index: rowIndex,
      columns,
      status: getRandomRowStatus(),
      type: getRandomRowType() as TableSpace.IRowTypes,
    }
  }

  export const generateMockReoTableData = (
    rowCount: number,
    columnsPattern: TableSpace.IColumnTypes[],
  ): TableSpace.IRow[] => {
    const rows: TableSpace.IRow[] = []
    for (let i = 0; i < rowCount; i++) {
      const newRow = generateReoRow(i, columnsPattern)
      rows.push(newRow)
    }
    return rows
  }

  export const generateMockScanTasks = (count: number): ReoSpace.IScanTask[] => {
    const tasks: ReoSpace.IScanTask[] = []

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
            TableSpace.IColumnTypes.Enum,
            TableSpace.IColumnTypes.Checkbox,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Country,
            TableSpace.IColumnTypes.Operator,
            TableSpace.IColumnTypes.Signal,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
          ]),
        )
      }, i * interval)
    }
  }
}
