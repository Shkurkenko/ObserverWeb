import { useMemo } from 'preact/hooks'
import { ReoScanStatus, ReoScanStatusType } from '../../../Shared/Interfaces/Reo.interface'

import './style.sass'

interface IScanLightStatusProps {
  statusType: ReoScanStatusType
}

export function ScanLightStatus({ statusType }: IScanLightStatusProps) {
  const color = useMemo(() => {
    const defaultStatusColors: Record<ReoScanStatusType, string> = {
      [ReoScanStatus.Running]: '#36b37e', // Some sort of green
      [ReoScanStatus.Pending]: '#FFEE58', // Some sort of yellow
      [ReoScanStatus.Failed]: '#FF5722', // Some sort of red
      [ReoScanStatus.Finished]: 'grey',
      [ReoScanStatus.Idle]: 'grey',
    }

    return defaultStatusColors[statusType] || 'pink'
  }, [statusType])

  return (
    <div className='scan-light' style={{ background: color }}>
      <div className='scan-light-core' style={{ background: color }}></div>
    </div>
  )
}
