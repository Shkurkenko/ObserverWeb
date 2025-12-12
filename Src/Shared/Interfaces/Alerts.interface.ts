export namespace AlertsSpace {
  export enum ILevel {
    Error = 'Error',
    Success = 'Success',
    Info = 'Info',
    Warning = 'Warning',
  }

  export interface IAlertType {
    id: string
    type: ILevel
    header: string
    message: string
    show: boolean
    ttl: number
  }
}
