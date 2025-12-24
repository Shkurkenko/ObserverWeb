import { useMemo } from 'preact/hooks'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'

import './style.sass'

interface IScanLightStatusProps {
  statusType: ReoSpace.IScanStatusTypes
}

export function ScanLightStatus({ statusType }: IScanLightStatusProps) {
  const color = useMemo(() => {
    const defaultStatusColors: Record<ReoSpace.IScanStatusTypes, string> = {
      [ReoSpace.IScanStatusTypes.Running]: '#36b37e', // Some sort of green
      [ReoSpace.IScanStatusTypes.Pending]: '#FFEE58', // Some sort of yellow
      [ReoSpace.IScanStatusTypes.Failed]: '#FF5722', // Some sort of red
      [ReoSpace.IScanStatusTypes.Finished]: 'grey',
    }

    return defaultStatusColors[statusType] || 'pink'
  }, [statusType])

  return (
    <div className='scan-light' style={{ background: color }}>
      <div className='scan-light-core' style={{ background: color }}></div>
    </div>
  )
}
