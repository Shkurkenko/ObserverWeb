import { AlertList } from '../Alerts'
import { useAlerts } from '../Alerts/Hooks/UseAlerts'

import './style.sass'

export function Journal() {
  const { alerts } = useAlerts()

  return (
    <div className='journal-container w-full'>
      <AlertList model={alerts} />
    </div>
  )
}
