export const AlertLevel = {
  Default: 'Default',

  Error: 'Error',

  Success: 'Success',

  Info: 'Info',

  Warning: 'Warning',
} as const

export type AlertLevelType = (typeof AlertLevel)[keyof typeof AlertLevel]

export interface Alert {
  id: string

  type: AlertLevelType

  header: string

  message: string

  show: boolean

  ttl: number
}
