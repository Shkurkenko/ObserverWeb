export namespace ReoSpace {
  export interface IScanTask {
    id: string
    name: string
    date: string
    time: string
    currentScanCycle: number
    types: IScanTypes[]
    status: IScanStatusTypes
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
  }

  export enum IScanStatusTypes {
    Finished,
    Running,
    Pending,
    Failed,
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

  export interface IReoTable {
    scanType: IScanTypes
    scanStatus: IScanStatusTypes
    currentScanCycle: number
  }
}
