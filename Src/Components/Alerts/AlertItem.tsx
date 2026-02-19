import { ComponentChildren } from 'preact'
import { StylableProps } from '@Components/Shared/Common.types'
import { type AlertLevelType, AlertLevel } from './Alerts.types'
import { getAlertConfig } from './Alerts.config'
import { getAlertIconComponent } from './Alerts.config'
import { AlertRoot } from './Components/AlertRoot'
import { AlertIcon } from './Components/AlertIcon'
import { AlertHeader } from './Components/AlertHeader'
import { AlertMessage } from './Components/AlertMessage'
import { AlertClose } from './Components/AlertClose'

import { cn } from '@Utils/Helpers'

/** Функция рендера иконки */
export type RenderIconFunction = (
  type: AlertLevelType,
  config: ReturnType<typeof getAlertConfig>,
) => ComponentChildren

/** Функция рендера заголовка */
export type RenderHeaderFunction = (header: string, type: AlertLevelType) => ComponentChildren

/** Функция рендера сообщения */
export type RenderMessageFunction = (message: string, type: AlertLevelType) => ComponentChildren

/** Пропсы для кастомного рендера */
export interface CustomRenderProps {
  /** Кастомная иконка */
  renderIcon?: RenderIconFunction
  /** Кастомный заголовок */
  renderHeader?: RenderHeaderFunction
  /** Кастомное сообщение */
  renderMessage?: RenderMessageFunction
}

/** Пропсы для кастомного алерта */
export interface CustomAlertProps extends StylableProps {
  /** Тип алерта */
  type: AlertLevelType
  /** Заголовок */
  header: string
  /** Сообщение */
  message: string
  /** Колбек закрытия */
  onClose?: () => void
  /** Кастомный рендер */
  renderers?: CustomRenderProps
}

/** Пропсы для AlertItem */
export interface AlertItemProps extends StylableProps {
  /** ID алерта */
  id: string
  /** Тип алерта (по умолчанию Default) */
  type?: AlertLevelType
  /** Заголовок */
  header: string
  /** Сообщение */
  message: string
  /** Колбек закрытия */
  onDismiss?: (id: string) => void
  /** Кастомный рендер (опционально) */
  renderers?: CustomRenderProps
}

/**
 * Кастомный алерт с возможностью переопределения частей
 */
const CustomAlert = ({
  type,
  header,
  message,
  onClose,
  renderers,
  className,
  style,
  ...props
}: CustomAlertProps) => {
  const config = getAlertConfig(type)
  const defaultIcon = getAlertIconComponent(type)

  return (
    <AlertRoot
      style={{ borderLeftColor: config.colors.base, ...style }}
      className={cn(config.tailwindClasses.container, className)}
      {...props}
    >
      {/* Иконка */}
      {renderers?.renderIcon ? (
        renderers.renderIcon(type, config)
      ) : (
        <AlertIcon className={config.tailwindClasses.icon}>{defaultIcon}</AlertIcon>
      )}

      {/* Заголовок */}
      {renderers?.renderHeader ? (
        renderers.renderHeader(header, type)
      ) : (
        <AlertHeader className={cn(config.tailwindClasses.header, 'font-semibold')}>
          {header}
        </AlertHeader>
      )}

      {/* Сообщение */}
      {renderers?.renderMessage ? (
        renderers.renderMessage(message, type)
      ) : (
        <AlertMessage className={config.tailwindClasses.message}>{message}</AlertMessage>
      )}

      {/* Кнопка закрытия */}
      {onClose && <AlertClose onClose={onClose} className={config.tailwindClasses.closeHover} />}
    </AlertRoot>
  )
}

/**
 * Пресеты алертов для быстрого доступа без проверок
 */
const ALERT_PRESETS = {
  [AlertLevel.Error]: (props: Omit<CustomAlertProps, 'type'>) => (
    <CustomAlert type={AlertLevel.Error} {...props} />
  ),
  [AlertLevel.Success]: (props: Omit<CustomAlertProps, 'type'>) => (
    <CustomAlert type={AlertLevel.Success} {...props} />
  ),
  [AlertLevel.Warning]: (props: Omit<CustomAlertProps, 'type'>) => (
    <CustomAlert type={AlertLevel.Warning} {...props} />
  ),
  [AlertLevel.Info]: (props: Omit<CustomAlertProps, 'type'>) => (
    <CustomAlert type={AlertLevel.Info} {...props} />
  ),
  [AlertLevel.Default]: (props: Omit<CustomAlertProps, 'type'>) => (
    <CustomAlert type={AlertLevel.Default} {...props} />
  ),
} as const

/**
 * Основной компонент для отображения одного алерта
 */
export const AlertItem = ({
  id,
  type = AlertLevel.Default,
  header,
  message,
  onDismiss,
  renderers,
  ...props
}: AlertItemProps) => {
  const handleClose = () => onDismiss?.(id)

  // Если есть кастомный рендер - используем CustomAlert напрямую
  if (renderers?.renderIcon || renderers?.renderHeader || renderers?.renderMessage) {
    return (
      <CustomAlert
        type={type}
        header={header}
        message={message}
        onClose={handleClose}
        renderers={renderers}
        {...props}
      />
    )
  }

  // Иначе используем пресет (быстрее, меньше проверок)
  const Preset = ALERT_PRESETS[type]
  return <Preset header={header} message={message} onClose={handleClose} {...props} />
}
