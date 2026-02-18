// Alerts.config.ts
import { AlertLevel, type AlertLevelType } from './Alerts.types'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CancelCircleIcon,
  InformationSquareIcon,
  CheckmarkCircle04Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons'

/**
 * Цветовая палитра для каждого типа алертов
 * Содержит базовые, светлые, темные цвета и цвета для границ и hover состояний
 */
export const ALERT_COLORS = {
  [AlertLevel.Error]: {
    /** Основной цвет алерта (используется для иконок и акцентов) */
    base: '#F44336',
    /** Цвет фона алерта (светлая версия) */
    light: '#FFEBEE',
    /** Темная версия цвета (для текста при необходимости) */
    dark: '#D32F2F',
    /** Цвет границы алерта */
    border: '#FFCDD2',
    /** Цвет при наведении */
    hover: '#EF5350',
  },
  [AlertLevel.Success]: {
    base: '#4CAF50',
    light: '#E8F5E9',
    dark: '#2E7D32',
    border: '#C8E6C9',
    hover: '#66BB6A',
  },
  [AlertLevel.Warning]: {
    base: '#e9c731',
    light: '#FFF9E7',
    dark: '#F57F17',
    border: '#FFF3C9',
    hover: '#FFD54F',
  },
  [AlertLevel.Info]: {
    base: '#2a86cf',
    light: '#E3F2FD',
    dark: '#1565C0',
    border: '#BBDEFB',
    hover: '#42A5F5',
  },
  [AlertLevel.Default]: {
    base: '#9E9E9E',
    light: '#F5F5F5',
    dark: '#616161',
    border: '#E0E0E0',
    hover: '#BDBDBD',
  },
} as const

/**
 * Конфигурация иконок для каждого типа алертов
 * Содержит компонент иконки, размер и текстовую метку
 */
export const ALERT_ICONS = {
  [AlertLevel.Error]: {
    /** Компонент иконки из библиотеки Hugeicons */
    component: CancelCircleIcon,
    /** Размер иконки в пикселях */
    size: 28,
    /** Текстовая метка для accessibility */
    label: 'Ошибка',
  },
  [AlertLevel.Success]: {
    component: CheckmarkCircle04Icon,
    size: 28,
    label: 'Успешно',
  },
  [AlertLevel.Warning]: {
    component: Alert01Icon,
    size: 28,
    label: 'Предупреждение',
  },
  [AlertLevel.Info]: {
    component: InformationSquareIcon,
    size: 28,
    label: 'Информация',
  },
  [AlertLevel.Default]: {
    component: InformationSquareIcon,
    size: 28,
    label: 'Уведомление',
  },
} as const

/**
 * Заголовки по умолчанию для каждого типа алертов
 * Используются, когда заголовок не передан явно
 */
export const ALERT_DEFAULT_HEADERS = {
  [AlertLevel.Error]: 'Ошибка',
  [AlertLevel.Success]: 'Успешно',
  [AlertLevel.Warning]: 'Предупреждение',
  [AlertLevel.Info]: 'Информация',
  [AlertLevel.Default]: 'Уведомление',
} as const

/**
 * ARIA метки для accessibility
 * Используются для скринридеров и улучшения доступности
 */
export const ALERT_ARIA_LABELS = {
  [AlertLevel.Error]: 'Сообщение об ошибке',
  [AlertLevel.Success]: 'Сообщение об успехе',
  [AlertLevel.Warning]: 'Предупреждение',
  [AlertLevel.Info]: 'Информационное сообщение',
  [AlertLevel.Default]: 'Уведомление',
} as const

/**
 * Tailwind CSS классы для каждого типа алертов
 * Содержит классы для контейнера, заголовка, иконки, сообщения и кнопки закрытия
 */
export const ALERT_TAILWIND_CLASSES = {
  [AlertLevel.Error]: {
    /** Классы для контейнера алерта (фон, границы, отступы) */
    container: 'border-l-4 border-red-500 bg-red-50',
    /** Классы для заголовка (цвет текста) */
    header: 'text-red-700',
    /** Классы для иконки (цвет) */
    icon: 'text-red-500',
    /** Классы для текста сообщения */
    message: 'text-gray-600',
    /** Классы для кнопки закрытия */
    close: 'text-gray-400 hover:text-gray-600 hover:bg-red-100',
    /** Классы для hover состояния кнопки закрытия */
    closeHover: 'hover:bg-red-100',
  },
  [AlertLevel.Success]: {
    container: 'border-l-4 border-green-500 bg-green-50',
    header: 'text-green-700',
    icon: 'text-green-500',
    message: 'text-gray-600',
    close: 'text-gray-400 hover:text-gray-600 hover:bg-green-100',
    closeHover: 'hover:bg-green-100',
  },
  [AlertLevel.Warning]: {
    container: 'border-l-4 border-yellow-500 bg-yellow-50',
    header: 'text-yellow-700',
    icon: 'text-yellow-500',
    message: 'text-gray-600',
    close: 'text-gray-400 hover:text-gray-600 hover:bg-yellow-100',
    closeHover: 'hover:bg-yellow-100',
  },
  [AlertLevel.Info]: {
    container: 'border-l-4 border-blue-500 bg-blue-50',
    header: 'text-blue-700',
    icon: 'text-blue-500',
    message: 'text-gray-600',
    close: 'text-gray-400 hover:text-gray-600 hover:bg-blue-100',
    closeHover: 'hover:bg-blue-100',
  },
  [AlertLevel.Default]: {
    container: 'border-l-4 border-gray-500 bg-gray-50',
    header: 'text-gray-700',
    icon: 'text-gray-500',
    message: 'text-gray-600',
    close: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
    closeHover: 'hover:bg-gray-100',
  },
} as const

/**
 * Приоритеты алертов для сортировки
 * Чем выше число, тем важнее алерт (ошибки важнее информации)
 */
export const ALERT_PRIORITIES = {
  [AlertLevel.Error]: 100,
  [AlertLevel.Warning]: 80,
  [AlertLevel.Success]: 60,
  [AlertLevel.Info]: 40,
  [AlertLevel.Default]: 20,
} as const

/**
 * Конфигурация анимаций для появления и исчезновения алертов
 */
export const ALERT_ANIMATIONS = {
  /** Анимация появления */
  enter: {
    /** CSS класс для анимации */
    className: 'animate-slideIn',
    /** Длительность анимации в миллисекундах */
    duration: 300,
    /** Функция сглаживания */
    easing: 'ease-out',
  },
  /** Анимация исчезновения */
  exit: {
    className: 'animate-slideOut',
    duration: 200,
    easing: 'ease-in',
  },
} as const

/**
 * Время автоматического закрытия для каждого типа алертов
 * @value 0 - не закрывать автоматически
 * @value число - время в миллисекундах
 */
export const ALERT_AUTO_CLOSE_TIMES = {
  [AlertLevel.Error]: 0, // Не закрываем автоматически
  [AlertLevel.Success]: 5000, // 5 секунд
  [AlertLevel.Warning]: 8000, // 8 секунд
  [AlertLevel.Info]: 5000, // 5 секунд
  [AlertLevel.Default]: 5000, // 5 секунд
} as const

// ==================== ТИПЫ ====================

/** Тип цветовой палитры для конкретного типа алерта */
export type AlertColorPalette = (typeof ALERT_COLORS)[AlertLevelType]

/** Тип конфигурации иконки для конкретного типа алерта */
export type AlertIconConfig = (typeof ALERT_ICONS)[AlertLevelType]

/** Тип Tailwind классов для конкретного типа алерта */
export type AlertTailwindClasses = (typeof ALERT_TAILWIND_CLASSES)[AlertLevelType]

// ==================== ОСНОВНОЙ КОНФИГ ====================

/** Полный конфигурационный объект для конкретного типа алерта */
export interface AlertConfig {
  /** Цветовая палитра */
  colors: (typeof ALERT_COLORS)[AlertLevelType]
  /** Конфигурация иконки */
  icon: (typeof ALERT_ICONS)[AlertLevelType]
  /** Заголовок по умолчанию */
  defaultHeader: (typeof ALERT_DEFAULT_HEADERS)[AlertLevelType]
  /** ARIA метка для доступности */
  ariaLabel: (typeof ALERT_ARIA_LABELS)[AlertLevelType]
  /** Tailwind CSS классы */
  tailwindClasses: (typeof ALERT_TAILWIND_CLASSES)[AlertLevelType]
  /** Приоритет для сортировки */
  priority: (typeof ALERT_PRIORITIES)[AlertLevelType]
  /** Время авто-закрытия в миллисекундах */
  autoCloseTime: (typeof ALERT_AUTO_CLOSE_TIMES)[AlertLevelType]
}

/**
 * Получить полный конфиг для указанного типа алерта
 * @param type - тип алерта (error, success, warning, info, default)
 * @returns объект с полной конфигурацией для данного типа
 * @example
 * const config = getAlertConfig(AlertLevel.Error)
 * console.log(config.colors.base) // '#F44336'
 */
export const getAlertConfig = (type: AlertLevelType): AlertConfig => {
  return {
    colors: ALERT_COLORS[type],
    icon: ALERT_ICONS[type],
    defaultHeader: ALERT_DEFAULT_HEADERS[type],
    ariaLabel: ALERT_ARIA_LABELS[type],
    tailwindClasses: ALERT_TAILWIND_CLASSES[type],
    priority: ALERT_PRIORITIES[type],
    autoCloseTime: ALERT_AUTO_CLOSE_TIMES[type],
  }
}

// ==================== ХЕЛПЕРЫ ====================

/**
 * Получить JSX компонент иконки для указанного типа алерта
 * @param type - тип алерта
 * @returns JSX элемент с иконкой
 * @example
 * const icon = getAlertIconComponent(AlertLevel.Success)
 * return <div>{icon}</div>
 */
export const getAlertIconComponent = (type: AlertLevelType) => {
  const { component, size } = ALERT_ICONS[type]
  return <HugeiconsIcon icon={component} size={size} />
}

/**
 * Получить базовый цвет для указанного типа алерта
 * @param type - тип алерта
 * @returns hex-код цвета
 * @example
 * const color = getAlertBaseColor(AlertLevel.Error) // '#F44336'
 */
export const getAlertBaseColor = (type: AlertLevelType): string => {
  return ALERT_COLORS[type].base
}

/**
 * Получить Tailwind CSS классы для указанного типа алерта
 * @param type - тип алерта
 * @returns объект с CSS классами для разных частей алерта
 * @example
 * const classes = getAlertClasses(AlertLevel.Info)
 * return <div className={classes.container}>
 */
export const getAlertClasses = (type: AlertLevelType) => {
  return ALERT_TAILWIND_CLASSES[type]
}

/**
 * Проверить, является ли переданное значение валидным типом алерта
 * @param type - проверяемое значение
 * @returns true если тип валидный
 * @example
 * if (isValidAlertType(userInput)) {
 *   const config = getAlertConfig(userInput)
 * }
 */
export const isValidAlertType = (type: unknown): type is AlertLevelType => {
  return Object.values(AlertLevel).includes(type as AlertLevelType)
}
