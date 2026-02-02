import { TableSpace } from './Table.interface'
import { ITab } from './Main.interface'
import { IView } from './Main.interface'

export namespace ReoSpace {
  export interface IReoTableMetaInfo {
    scanType: IScanTypes

    scanStatus?: IScanStatusTypes

    currentScanCycle?: number
  }

  export interface INetworkData {
    id: string

    index: number

    name: string

    type: IScanTypes

    icon: string

    signalCount: number

    hasNewData?: boolean

    lastUpdate?: Date

    description?: string
  }

  export interface IScanTask {
    id: string

    name: string

    currentScanCycle: number

    types: IScanTypes[]

    status: IScanStatusTypes

    createdAt: string // new Date().toISOString()

    duration: number
  }

  export enum IScanMode {
    Fast = 'fast',

    Slow = 'slow', // Eng reo more data
  }

  export enum IRoles {
    Enum = 'enumiration',

    Operator = 'operator',

    Cid = 'cid',

    LacTac = 'lacTac',

    Mcc = 'mcc',

    Mnc = 'mnc',

    RxLevel = 'rxLevel',

    Unknown = 'unknown',
  }

  export enum IScanTypes {
    Gsm = 'GSM',

    Lte = 'LTE',

    Umts = 'UMTS',

    Bluetooth = 'Bluetooth',

    Wifi = 'WiFi',

    FiveG = '5G',

    Unknown = 'Unknown',
  }

  export enum IScanStatusTypes {
    Finished = 'finished',

    Running = 'running',

    Pending = 'pending',

    Failed = 'failed',

    Idle = 'idle',
  }

  export enum ISignalLevels {
    Excellent = 'excellent',

    Good = 'good',

    Fair = 'fair',

    Poor = 'poor',

    No = 'no',
  }

  export interface ISignalRange {
    beginValue: number

    endValue: number
  }

  export interface IReoTabData {
    metaInfo: IReoTableMetaInfo

    rows: TableSpace.IRow[]

    hasNewData: boolean
  }

  export interface IReoTab extends ITab {
    data: IReoTabData
  }

  export interface IReoView extends IView {
    taskId: string

    headerString: string

    isScanning?: boolean

    tabsModel: IReoTab[]

    onStartScan?: () => void

    onStopScan?: () => void

    onClearData?: () => void

    onExportData?: () => void
  }

  export interface IReoTable {
    scanType: IScanTypes

    scanStatus: IScanStatusTypes

    currentScanCycle: number
  }
}
