import { TableSpace } from '../Shared/Interfaces/Table.interface'

export const MockOperators: TableSpace.IOperatorCellData[] = [
  { name: 'MTS', code: 1, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'Beeline', code: 2, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'Megafon', code: 3, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'Tele2', code: 4, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'Yota', code: 5, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'SkyLink', code: 6, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'Rostelecom', code: 7, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'HzTelecom', code: 8, position: { rowIndex: 0, colIndex: 0 } },
  { name: 'AnotherTelecom', code: 9, position: { rowIndex: 0, colIndex: 0 } },
]

export const MockCountries: TableSpace.ICountryCellData[] = [
  { name: 'Россия', countryAbb: 'RU', countryCode: 250, position: { rowIndex: 0, colIndex: 0 } },
  {
    name: 'США',
    countryAbb: 'US',
    countryCode: 251,
    position: { rowIndex: 0, colIndex: 0 },
  },
  {
    name: 'Германия',
    countryAbb: 'DE',
    countryCode: 252,
    position: {
      rowIndex: 0,
      colIndex: 0,
    },
  },
  {
    name: 'Франция',
    countryAbb: 'FR',
    countryCode: 253,
    position: {
      rowIndex: 0,
      colIndex: 0,
    },
  },
  {
    name: 'Италия',
    countryAbb: 'IT',
    countryCode: 254,
    position: {
      rowIndex: 0,
      colIndex: 0,
    },
  },
  {
    name: 'Испания',
    countryAbb: 'ES',
    countryCode: 255,
    position: {
      rowIndex: 0,
      colIndex: 0,
    },
  },
]

/* For fast copy
export const scanRowsData1: TableSpace.IRow[] = MockGenHelpers.generateMockReoTableData(50, [
  TableSpace.IColumnTypes.Enum,
  TableSpace.IColumnTypes.Operator,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Country,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Text,
])

export const scanRowsData2: TableSpace.IRow[] = MockGenHelpers.generateMockReoTableData(30, [
  TableSpace.IColumnTypes.Enum,
  TableSpace.IColumnTypes.Operator,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Checkbox,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
])

export const scanRowsData3: TableSpace.IRow[] = MockGenHelpers.generateMockReoTableData(100, [
  TableSpace.IColumnTypes.Enum,
  TableSpace.IColumnTypes.Operator,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Checkbox,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Checkbox,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Signal,
  TableSpace.IColumnTypes.Checkbox,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
  TableSpace.IColumnTypes.Text,
])

export const mockTablesArray: TableSpace.IRow[][] = [scanRowsData1, scanRowsData2, scanRowsData3]
*/
