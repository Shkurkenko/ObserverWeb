import { TableBaseCellData, TableRow } from './Table.interface'
import { Tab } from '../../Components/Tabs/TabGroup'

export const ReoScanMode = {
  Fast: 'Fast',

  Slow: 'Slow',
} as const
export type ReoScanModeType = (typeof ReoScanMode)[keyof typeof ReoScanMode]

export const ReoRole = {
  Enum: 'Enumiration',

  Operator: 'Operator',

  Cid: 'Cid',

  LacTac: 'LacTac',

  Mcc: 'Mcc',

  Mnc: 'Mnc',

  RxLevel: 'RxLevel',

  Unknown: 'Unknown',
} as const
export type ReoRoleType = (typeof ReoRole)[keyof typeof ReoRole]

export const ReoScanVariant = {
  Gsm: 'GSM',

  Lte: 'LTE',

  Umts: 'UMTS',

  Bluetooth: 'Bluetooth',

  Wifi: 'WiFi',

  FiveG: '5G',

  Unknown: 'Unknown',
} as const
export type ReoScanVariantType = (typeof ReoScanVariant)[keyof typeof ReoScanVariant]

export const ReoScanStatus = {
  Finished: 'Finished',

  Running: 'Running',

  Pending: 'Pending',

  Failed: 'Failed',

  Idle: 'Idle',
} as const
export type ReoScanStatusType = (typeof ReoScanStatus)[keyof typeof ReoScanStatus]

export const ReoSignalLevel = {
  Excellent: 'Excellent',

  Good: 'Good',

  Fair: 'Fair',

  Poor: 'Poor',

  No: 'No',
} as const
export type ReoSignalLevelType = (typeof ReoSignalLevel)[keyof typeof ReoSignalLevel]

export interface ReoTableMetaInfo {
  scanType: ReoScanVariantType

  scanStatus?: ReoScanStatusType
}

export interface ReoNetworkData {
  id: string

  index: number

  name: string

  type: ReoScanVariantType

  icon: string

  signalCount: number

  hasNewData?: boolean

  lastUpdate?: Date

  description?: string
}

export interface ReoScanTask {
  id: string

  name: string

  types: ReoScanVariantType[]

  status: ReoScanStatusType

  createdAt: string // new Date().toISOString()

  duration: number
}

export interface ReoSignalRange {
  beginValue: number

  endValue: number
}

export interface ReoTabData {
  metaInfo: ReoTableMetaInfo

  rows: TableRow[]

  hasNewData: boolean
}

export interface ReoTab extends Tab {
  data: ReoTabData
}

export interface View {
  id: string

  show: boolean
}
export interface ReoView extends View {
  taskId: string

  headerString: string

  isScanning?: boolean

  tabsModel: ReoTab[]

  onStartScan?: () => void

  onStopScan?: () => void

  onClearData?: () => void

  onExportData?: () => void
}

export interface ReoTable {
  scanType: ReoScanVariantType

  scanStatus: ReoScanStatusType
}

export interface ReoCountryCellData extends TableBaseCellData {
  name: string
  countryAbb: string
  countryCode: number
}

export interface ReoSignalCellData extends TableBaseCellData {
  range: ReoSignalRange
  value: number
}

export interface ReoOperatorCellData extends TableBaseCellData {
  name?: string
  iconPath?: string
  code: number
}
