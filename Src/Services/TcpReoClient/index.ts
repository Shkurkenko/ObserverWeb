import { ReoScanVariant } from '@Shared/Interfaces/Reo.interface'

// GSM данные с парсингом из BCCH-DL-SCH-Message
export interface GsmScanData {
  technology: typeof ReoScanVariant.Gsm

  timestamp: number
  // Основные поля
  mcc: number

  mnc: number

  lac?: number

  cellId?: string

  // Детали
  cellIdentity?: string // Hex строка "BF AE D6 50"

  arfcn?: number // Absolute Radio Frequency Channel Number

  bsic?: number // Base Station Identity Code

  rxLev?: number // Received Signal Level

  // Дополнительные поля
  c1?: number // Path loss criterion

  c2?: number // Cell reselection criterion

  raColorCode?: number // Random Access Color Code

  networkColorCode?: number // Network Color Code

  // Координаты если есть
  coordinates?: {
    lat: number

    lon: number

    accuracy?: number
  }
}

// UMTS данные
export interface UmtsScanData {
  technology: typeof ReoScanVariant.Umts
  timestamp: number
  // Основные поля
  mcc?: number
  mnc?: number
  lac?: number
  cellId?: string
  // Частотные параметры
  uarfcn?: number // UTRA Absolute Radio Frequency Channel Number
  psc?: number // Primary Scrambling Code
  // Уровень сигнала
  rscp?: number // Received Signal Code Power
  ecno?: number // Energy per Chip to Noise Density
  // Детали
  cpichRscp?: number // CPICH Received Signal Code Power
  cpichEcno?: number // CPICH Ec/No
  pathloss?: number
  // Дополнительно
  sibData?: Record<string, any> // System Information Blocks
}

// LTE данные
export interface LteScanData {
  technology: typeof ReoScanVariant.Lte
  timestamp: number
  // Основные поля
  mcc: number
  mnc: number
  tac?: string // Tracking Area Code (hex)
  cellId?: string
  // Идентификация соты
  pci?: number // Physical Cell ID
  earfcn?: number // E-UTRA Absolute Radio Frequency Channel Number
  // Уровень сигнала
  rsrp?: number // Reference Signal Received Power
  rsrq?: number // Reference Signal Received Quality
  sinr?: number // Signal to Interference plus Noise Ratio
  // Параметры сети
  bandwidth?: number // Channel bandwidth in MHz
  cqi?: number // Channel Quality Indicator
  // Дополнительно
  cellIdentity?: string
}

// Bluetooth данные
export interface BluetoothScanData {
  technology: typeof ReoScanVariant.Bluetooth
  timestamp: number
  // Основные поля
  address: string // MAC address (00:11:22:33:44:55)
  name?: string // Device name
  rssi: number // Received Signal Strength Indicator (dBm)
  // Тип устройства
  deviceClass?: number // Class of Device
  majorDeviceClass?: string // 'Computer', 'Phone', 'Audio', etc.
  minorDeviceClass?: string
  // Сервисы
  serviceUuids?: string[] // UUID сервисов
  manufacturerData?: Record<number, number[]> // Данные производителя
  // Флаги
  connectable?: boolean
  paired?: boolean
  // Дополнительно
  txPower?: number // Transmission power (dBm)
}

// WiFi данные
export interface WifiScanData {
  technology: typeof ReoScanVariant.Wifi
  timestamp: number
  // Основные поля
  bssid: string // MAC address (00:11:22:33:44:55)
  ssid?: string // Network name
  rssi: number // Received Signal Strength Indicator (dBm)
  channel: number
  // Частотные параметры
  frequency?: number // MHz
  bandwidth?: number // MHz (20, 40, 80, 160)
  // Безопасность
  security?: string[] // ['WPA2', 'WPA', 'WEP', 'OPEN']
  encryption?: string // 'CCMP', 'TKIP', 'WEP'
  // Детали
  vendor?: string // Производитель
  capabilities?: string // Капабилити строка
  standard?: '802.11a' | '802.11b' | '802.11g' | '802.11n' | '802.11ac' | '802.11ax'
  // Дополнительно
  hidden?: boolean // Скрытая сеть
  maxRate?: number // Максимальная скорость (Mbps)
}

export type ScanData = GsmScanData | UmtsScanData | LteScanData | WifiScanData | BluetoothScanData

export interface RawScanMessage {
  type: string
  timestamp?: number
  data: Record<string, any>
}

export interface IParsedScanMessage {
  rawType: string
  timestamp: number
  data: ScanData
}
