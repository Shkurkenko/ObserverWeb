import { TableColumn, TableColumnAlignment } from '../../Src/Shared/Interfaces/Table.interface'
import {
  ReoRole,
  ReoScanVariant,
  ReoScanVariantType,
} from '../../Src/Shared/Interfaces/Reo.interface'

export type ReoColumnsModelsConfigType = Record<ReoScanVariantType, TableColumn[]>

export const MenubarSetup = {
  Notifications: 'Notifications',

  TaskManager: 'TaskManager',
} as const

export interface DeviceConfig {
  host: string
  port: number
  protocol: 'ws' | 'wss'
  autoReconnect: boolean
  reconnectInterval: number
  maxReconnectAttempts: number
}

export const SERVICE_CONFIG = {
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

export const ScanViewTitles: Record<ReoScanVariantType, string> = {
  [ReoScanVariant.Gsm]: 'GSM Сканирование',
  [ReoScanVariant.Lte]: 'LTE Сканирование',
  [ReoScanVariant.Umts]: 'UMTS Сканирование',
  [ReoScanVariant.Bluetooth]: 'Bluetooth Сканирование',
  [ReoScanVariant.Wifi]: 'WiFi Сканирование',
  [ReoScanVariant.FiveG]: '5G Сканирование',
  [ReoScanVariant.Unknown]: 'Неизвестное сканирование',
}

export const NetworkDescrptions: Record<ReoScanVariantType, string> = {
  [ReoScanVariant.Gsm]: 'GSM сети 900/1800 MHz',
  [ReoScanVariant.Lte]: 'LTE сети (4G)',
  [ReoScanVariant.Umts]: 'UMTS сети (3G)',
  [ReoScanVariant.FiveG]: '5G сети',
  [ReoScanVariant.Wifi]: 'Wi-Fi сети 2.4/5 GHz',
  [ReoScanVariant.Bluetooth]: 'Bluetooth устройства',
  [ReoScanVariant.Unknown]: 'Неопознаный вид связи',
}

export const NetworkTypeColors: Record<ReoScanVariantType, string> = {
  [ReoScanVariant.Gsm]: 'rgb(59, 130, 246)', // Синий
  [ReoScanVariant.Lte]: 'rgb(34, 197, 94)', // Зеленый
  [ReoScanVariant.Umts]: 'rgb(245, 158, 11)', // Оранжевый
  [ReoScanVariant.Bluetooth]: 'rgb(99, 102, 241)', // Индиго
  [ReoScanVariant.Wifi]: 'rgb(168, 85, 247)', // Фиолетовый
  [ReoScanVariant.FiveG]: 'rgb(239, 68, 68)', // Красный
  [ReoScanVariant.Unknown]: 'rgb(148, 163, 184)', // Серый
}

export const NetworkTypeIcons: Record<ReoScanVariantType, string> = {
  [ReoScanVariant.Gsm]: '📶',
  [ReoScanVariant.Lte]: '📶',
  [ReoScanVariant.Umts]: '📶',
  [ReoScanVariant.Bluetooth]: '📱',
  [ReoScanVariant.Wifi]: '📡',
  [ReoScanVariant.FiveG]: '5G',
  [ReoScanVariant.Unknown]: '❓',
}

export const NetworkFrequencyRanges: Record<ReoScanVariantType, { min: number; max: number }> = {
  [ReoScanVariant.Gsm]: { min: 880, max: 960 }, // GSM 900 диапазон
  [ReoScanVariant.Lte]: { min: 700, max: 2600 }, // LTE диапазоны
  [ReoScanVariant.Umts]: { min: 1920, max: 2170 }, // UMTS/3G диапазон
  [ReoScanVariant.Bluetooth]: { min: 2400, max: 2480 }, // Bluetooth диапазон
  [ReoScanVariant.Wifi]: { min: 2400, max: 5900 }, // WiFi 2.4GHz и 5GHz
  [ReoScanVariant.FiveG]: { min: 600, max: 6000 }, // 5G диапазоны
  [ReoScanVariant.Unknown]: { min: 0, max: 0 },
}

export const ReoColumnModelsConfig: ReoColumnsModelsConfigType = {
  [ReoScanVariant.Gsm]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'CID',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.LacTac.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'LAC/TAC',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      label: 'Страна',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mnc.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'Регион',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Operator.toString(),
      type: TableColumn.Operator,
      minWidth: 50,
      maxWidth: 200,
      label: 'Оператор',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.RxLevel.toString(),
      type: TableColumn.Signal,
      minWidth: 50,
      maxWidth: 200,
      label: 'Уровень Сигнала',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.Lte]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'CID',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      maxWidth: 200,
      label: 'Страна',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Operator.toString(),
      type: TableColumn.Operator,
      minWidth: 50,
      maxWidth: 200,
      label: 'Оператор',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.RxLevel.toString(),
      type: TableColumn.Signal,
      minWidth: 50,
      maxWidth: 200,
      label: 'Уровень Сигнала',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.Umts]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'CID',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.LacTac.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'LAC/TAC',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      maxWidth: 200,
      label: 'Страна',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mnc.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'Регион',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Operator.toString(),
      type: TableColumn.Operator,
      minWidth: 50,
      maxWidth: 200,
      label: 'Оператор',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.RxLevel.toString(),
      type: TableColumn.Signal,
      minWidth: 50,
      maxWidth: 200,
      label: 'Уровень Сигнала',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.Bluetooth]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'Some',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.LacTac.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'Bluetooth',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      maxWidth: 200,
      label: 'Columns',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.Wifi]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'Some',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.LacTac.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'WiFi',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      maxWidth: 200,
      label: 'Columns',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.FiveG]: [
    {
      role: ReoRole.Enum.toString(),
      type: TableColumn.Enum,
      width: 70,
      label: '#',
    },
    {
      role: ReoRole.Cid.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: '5G',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.LacTac.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: 'for',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mcc.toString(),
      type: TableColumn.Country,
      minWidth: 50,
      maxWidth: 200,
      label: 'real',
      align: TableColumnAlignment.Center,
    },
    {
      role: ReoRole.Mnc.toString(),
      type: TableColumn.Text,
      minWidth: 50,
      maxWidth: 200,
      label: '?',
      align: TableColumnAlignment.Center,
    },
  ],
  [ReoScanVariant.Unknown]: [],
}
