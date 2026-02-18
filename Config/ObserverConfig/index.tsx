import { IMenubarModel } from '../../Src/Components/Menubar'
import { TaskSidebar } from '../../Src/Components/TaskSidebar'
import { Journal } from '../../Src/Components/Journal'
import { TableSpace } from '../../Src/Shared/Interfaces/Table.interface'
import { BurgerIcon } from '../../Src/Components/Icons/BurgerIcon'
import { BellIcon } from '../../Src/Components/Icons/BellIcon'
import { ReoScanVariantType } from '../../Src/Shared/Interfaces/Reo.interface'

export type ReoColumnsModelsConfigType = Record<ReoScanVariantType, TableSpace.IColumn[]>

export const MenubarSetup = {
  Notifications: 'Notifications',

  TaskManager: 'TaskManager',
} as const

export const MenubarConfig: IMenubarModel = {
  currentIndex: 0,
  items: [
    {
      id: 0,
      role: MenubarSetup.TaskManager,
      active: false,
      icon: <BurgerIcon />,
      content: <TaskSidebar />,
    },
    {
      id: 1,
      role: MenubarSetup.Notifications,
      active: false,
      icon: <BellIcon />,
      content: <Journal />,
    },
  ],
}

export namespace ThemeEngine {
  export const Themes = {
    ForensicGreen: {
      light: async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/light.css?raw'),
      'light-hc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
      'light-mc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/light-mid-contrast.css?raw'),
      dark: async () => await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/dark.css?raw'),
      'dark-hc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
      'dark-mc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicGreen/css/dark-mid-contrast.css?raw'),
    },
    ForensicBlue: {
      light: async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/light.css?raw'),
      'light-hc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
      'light-mc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/light-mid-contrast.css?raw'),
      dark: async () => await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/dark.css?raw'),
      'dark-hc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
      'dark-mc': async () =>
        await import('../Themes/ForensicThemes/WEB/ForensicBlue/css/dark-mid-contrast.css?raw'),
    },
  } as const

  export type Theme = keyof typeof Themes
  export type Variant = keyof (typeof Themes)[Theme]
}

export namespace ObserverConfig {
  export interface IDeviceConfig {
    host: string
    port: number
    protocol: 'ws' | 'wss'
    autoReconnect: boolean
    reconnectInterval: number
    maxReconnectAttempts: number
  }

  export const serviceConfigs = {
    development: {
      host: 'localhost',
      port: 8888,
      protocol: 'ws' as const, // or 'wss'
      autoReconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
    },

    production: {
      host: '172.16.48.123',
      port: 8080,
      protocol: 'ws' as const, // or 'wss'
      autoReconnect: true,
      reconnectInterval: 10000,
      maxReconnectAttempts: 3,
    },
  }

  export const ScanViewTitles: Record<ReoSpace.IScanTypes, string> = {
    [ReoSpace.IScanTypes.Gsm]: 'GSM Сканирование',
    [ReoSpace.IScanTypes.Lte]: 'LTE Сканирование',
    [ReoSpace.IScanTypes.Umts]: 'UMTS Сканирование',
    [ReoSpace.IScanTypes.Bluetooth]: 'Bluetooth Сканирование',
    [ReoSpace.IScanTypes.Wifi]: 'WiFi Сканирование',
    [ReoSpace.IScanTypes.FiveG]: '5G Сканирование',
    [ReoSpace.IScanTypes.Unknown]: 'Неизвестное сканирование',
  }

  export const NetworkDescrptions: Record<ReoSpace.IScanTypes, string> = {
    [ReoSpace.IScanTypes.Gsm]: 'GSM сети 900/1800 MHz',
    [ReoSpace.IScanTypes.Lte]: 'LTE сети (4G)',
    [ReoSpace.IScanTypes.Umts]: 'UMTS сети (3G)',
    [ReoSpace.IScanTypes.FiveG]: '5G сети',
    [ReoSpace.IScanTypes.Wifi]: 'Wi-Fi сети 2.4/5 GHz',
    [ReoSpace.IScanTypes.Bluetooth]: 'Bluetooth устройства',
    [ReoSpace.IScanTypes.Unknown]: 'Неопознаный вид связи',
  }

  export const NetworkTypeColors: Record<ReoSpace.IScanTypes, string> = {
    [ReoSpace.IScanTypes.Gsm]: 'rgb(59, 130, 246)', // Синий
    [ReoSpace.IScanTypes.Lte]: 'rgb(34, 197, 94)', // Зеленый
    [ReoSpace.IScanTypes.Umts]: 'rgb(245, 158, 11)', // Оранжевый
    [ReoSpace.IScanTypes.Bluetooth]: 'rgb(99, 102, 241)', // Индиго
    [ReoSpace.IScanTypes.Wifi]: 'rgb(168, 85, 247)', // Фиолетовый
    [ReoSpace.IScanTypes.FiveG]: 'rgb(239, 68, 68)', // Красный
    [ReoSpace.IScanTypes.Unknown]: 'rgb(148, 163, 184)', // Серый
  }

  export const NetworkTypeIcons: Record<ReoSpace.IScanTypes, string> = {
    [ReoSpace.IScanTypes.Gsm]: '📶',
    [ReoSpace.IScanTypes.Lte]: '📶',
    [ReoSpace.IScanTypes.Umts]: '📶',
    [ReoSpace.IScanTypes.Bluetooth]: '📱',
    [ReoSpace.IScanTypes.Wifi]: '📡',
    [ReoSpace.IScanTypes.FiveG]: '5G',
    [ReoSpace.IScanTypes.Unknown]: '❓',
  }

  export const NetworkFrequencyRanges: Record<ReoSpace.IScanTypes, { min: number; max: number }> = {
    [ReoSpace.IScanTypes.Gsm]: { min: 880, max: 960 }, // GSM 900 диапазон
    [ReoSpace.IScanTypes.Lte]: { min: 700, max: 2600 }, // LTE диапазоны
    [ReoSpace.IScanTypes.Umts]: { min: 1920, max: 2170 }, // UMTS/3G диапазон
    [ReoSpace.IScanTypes.Bluetooth]: { min: 2400, max: 2480 }, // Bluetooth диапазон
    [ReoSpace.IScanTypes.Wifi]: { min: 2400, max: 5900 }, // WiFi 2.4GHz и 5GHz
    [ReoSpace.IScanTypes.FiveG]: { min: 600, max: 6000 }, // 5G диапазоны
    [ReoSpace.IScanTypes.Unknown]: { min: 0, max: 0 },
  }

  export type ScanStatusColorsType = Record<
    ReoSpace.IScanStatusTypes,
    { bg: string; glow: string; text: string }
  >
  export const ScanStatusColors: ScanStatusColorsType = {
    [ReoSpace.IScanStatusTypes.Idle]: {
      bg: '#B4CCBC', // secondary
      glow: '#B4CCBC',
      text: '#203529', // onSecondary
    },
    [ReoSpace.IScanStatusTypes.Running]: {
      bg: '#8FD5AF', // primary
      glow: '#8FD5AF',
      text: '#003823', // onPrimary
    },
    [ReoSpace.IScanStatusTypes.Failed]: {
      bg: '#FFB4AB', // error
      glow: '#FFB4AB',
      text: '#690005', // onError
    },
    [ReoSpace.IScanStatusTypes.Finished]: {
      bg: '#005235', // primaryContainer
      glow: '#8FD5AF',
      text: '#ABF2CA', // onPrimaryContainer
    },
    [ReoSpace.IScanStatusTypes.Pending]: {
      bg: '#D0E8D7', // onSecondaryContainer
      glow: '#B4CCBC',
      text: '#203529',
    },
  }

  export const FastAlerts: FastAlertsSpace.IStyleConfig = {
    general: {
      transition: 0.3,
    },
    error: {
      icon: AlertsConfig.error.icon,
      iconColor: '#ea5233',
      backgroundColor: '#341b2a',
      color: '#ecc6c9',
      borderColor: '#4b1d2c',
    },
    success: {
      icon: AlertsConfig.success.icon,
      iconColor: '#5dad58',
      backgroundColor: '#0e2a2c',
      color: '#b9f8b5',
      borderColor: '#0d3b30',
    },
    warning: {
      icon: AlertsConfig.warning.icon,
      iconColor: '#fad947',
      backgroundColor: '#262724',
      color: '#fef9b8',
      borderColor: '#322f22',
    },
    info: {
      icon: AlertsConfig.info.icon,
      iconColor: '#0288D1',
      backgroundColor: '#12233e',
      color: '#8ec5ff',
      borderColor: '#162c54',
    },
  }

  export const ReoColumnModelsConfig: IReoColumnsModelsConfig = {
    [ReoSpace.IScanTypes.Gsm]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 230,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 330,
        minWidth: 50,
        maxWidth: 200,
        label: 'LAC/TAC',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        minWidth: 50,
        // maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Регион',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Lte]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Umts]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'LAC/TAC',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Регион',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Bluetooth]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Some',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Bluetooth',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Columns',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Wifi]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Some',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'WiFi',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Columns',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.FiveG]: [
      {
        role: ReoSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 70,
        label: '#',
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '5G',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'for',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'real',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        // width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '?',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Unknown]: [],
  }
}
