import { useEffect } from 'preact/hooks'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'

import './style.sass'

interface IScanLightStatusProps {
  statusType: ReoSpace.IScanStatusTypes
}

export function ScanLightStatus({ statusType }: IScanLightStatusProps) {
  const defaultStatusColors = {
    running: '#36b37e', // Some sort of green
    pending: '#FFEE58', // Some sort of yellow
    failed: '#FF5722', // Some sort of red
  }

  function getColor() {
    switch (statusType) {
      case ReoSpace.IScanStatusTypes.Running:
        return defaultStatusColors.running
      case ReoSpace.IScanStatusTypes.Pending:
        return defaultStatusColors.pending
      case ReoSpace.IScanStatusTypes.Failed:
        return defaultStatusColors.failed
    }
  }

  return (
    <div className='scan-light' style={{ background: getColor() }}>
      <div className='scan-light-core' style={{ background: getColor() }}></div>
    </div>
  )
}
