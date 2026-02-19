import { ReoScanStatusType, ReoScanStatus } from '../../../Shared/Interfaces/Reo.interface'

export type ScanStatusColorsType = Record<
  ReoScanStatusType,
  { bg: string; glow: string; text: string }
>
export const ScanStatusColors: ScanStatusColorsType = {
  [ReoScanStatus.Idle]: {
    bg: '#B4CCBC', // secondary
    glow: '#B4CCBC',
    text: '#203529', // onSecondary
  },
  [ReoScanStatus.Running]: {
    bg: '#8FD5AF', // primary
    glow: '#8FD5AF',
    text: '#003823', // onPrimary
  },
  [ReoScanStatus.Failed]: {
    bg: '#FFB4AB', // error
    glow: '#FFB4AB',
    text: '#690005', // onError
  },
  [ReoScanStatus.Finished]: {
    bg: '#005235', // primaryContainer
    glow: '#8FD5AF',
    text: '#ABF2CA', // onPrimaryContainer
  },
  [ReoScanStatus.Pending]: {
    bg: '#D0E8D7', // onSecondaryContainer
    glow: '#B4CCBC',
    text: '#203529',
  },
}
