import { AlertsSpace } from '../../Shared/Interfaces/Alerts.interface'
import { FastAlertItem } from './FastAlertItem'
import { ObserverConfig } from '../../../Config/ObserverConfig'
import { useFastAlerts } from './Hooks/UseFastAlerts'

import './style.sass'

export function FastAlerts() {
  const { fastAlerts } = useFastAlerts()

  const renderFastNotification = (
    type: AlertsSpace.ILevel,
    message: string,
    alertObject: AlertsSpace.IAlertType,
  ) => {
    switch (type) {
      case AlertsSpace.ILevel.Error:
        return (
          <FastAlertItem
            backgroundColor={ObserverConfig.FastAlerts.error.backgroundColor}
            borderColor={ObserverConfig.FastAlerts.error.borderColor}
            color={ObserverConfig.FastAlerts.error.color}
            icon={ObserverConfig.FastAlerts.error.icon}
            transitionTime={ObserverConfig.FastAlerts.general.transition}
            message={message}
            data={alertObject}
          />
        )
      case AlertsSpace.ILevel.Info:
        return (
          <FastAlertItem
            backgroundColor={ObserverConfig.FastAlerts.info.backgroundColor}
            borderColor={ObserverConfig.FastAlerts.info.borderColor}
            color={ObserverConfig.FastAlerts.info.color}
            icon={ObserverConfig.FastAlerts.info.icon}
            message={message}
            transitionTime={ObserverConfig.FastAlerts.general.transition}
            data={alertObject}
          />
        )
      case AlertsSpace.ILevel.Warning:
        return (
          <FastAlertItem
            backgroundColor={ObserverConfig.FastAlerts.warning.backgroundColor}
            borderColor={ObserverConfig.FastAlerts.warning.borderColor}
            color={ObserverConfig.FastAlerts.warning.color}
            icon={ObserverConfig.FastAlerts.warning.icon}
            transitionTime={ObserverConfig.FastAlerts.general.transition}
            message={message}
            data={alertObject}
          />
        )
      case AlertsSpace.ILevel.Success:
        return (
          <FastAlertItem
            backgroundColor={ObserverConfig.FastAlerts.success.backgroundColor}
            borderColor={ObserverConfig.FastAlerts.success.borderColor}
            color={ObserverConfig.FastAlerts.success.color}
            icon={ObserverConfig.FastAlerts.success.icon}
            transitionTime={ObserverConfig.FastAlerts.general.transition}
            message={message}
            data={alertObject}
          />
        )
    }
  }

  return (
    <div className='fast-notifications'>
      {fastAlerts.map((notification: AlertsSpace.IAlertType) =>
        renderFastNotification(notification.type, notification.header, notification),
      )}
    </div>
  )
}
