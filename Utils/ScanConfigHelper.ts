// src/Utils/ScanConfigHelpers.ts
import { ObserverConfig } from '../Config/ObserverConfig'
import { ReoSpace } from '../Src/Shared/Interfaces/Reo.interface'
import { TableSpace } from '../Src/Shared/Interfaces/Table.interface'

export class ScanConfigHelpers {
  // Получить колонки для типа сети
  static getColumnsForNetworkType(networkType: ReoSpace.IScanTypes): TableSpace.IColumn[] {
    return ObserverConfig.ReoColumnModelsConfig[networkType] || []
  }

  // Получить заголовок для типа сети
  static getTitleForNetworkType(networkType: ReoSpace.IScanTypes): string {
    return ObserverConfig.ScanViewTitles[networkType] || 'Сканирование'
  }

  // Получить цвет для типа сети
  static getColorForNetworkType(networkType: ReoSpace.IScanTypes): string {
    return ObserverConfig.NetworkTypeColors[networkType] || 'rgb(59, 130, 246)'
  }

  // Получить иконку для типа сети
  static getIconForNetworkType(networkType: ReoSpace.IScanTypes): string {
    return ObserverConfig.NetworkTypeIcons[networkType] || '📶'
  }

  // Получить частотный диапазон для типа сети
  static getFrequencyRange(networkType: ReoSpace.IScanTypes): { min: number; max: number } {
    return ObserverConfig.NetworkFrequencyRanges[networkType] || { min: 0, max: 0 }
  }

  // Получить настройки по умолчанию для типа сети
  static getDefaultSettings(networkType: ReoSpace.IScanTypes): any {
    return ObserverConfig.DefaultScanSettings[networkType] || {}
  }

  // Проверить, поддерживается ли тип сети
  static isNetworkTypeSupported(networkType: string): boolean {
    return Object.values(ReoSpace.IScanTypes).includes(networkType as ReoSpace.IScanTypes)
  }

  // Получить все поддерживаемые типы сетей
  static getAllNetworkTypes(): Array<{
    type: ReoSpace.IScanTypes
    title: string
    icon: string
    color: string
    frequencyRange: { min: number; max: number }
  }> {
    return Object.values(ReoSpace.IScanTypes).map((type) => ({
      type,
      title: this.getTitleForNetworkType(type),
      icon: this.getIconForNetworkType(type),
      color: this.getColorForNetworkType(type),
      frequencyRange: this.getFrequencyRange(type),
    }))
  }

  // Создать конфигурацию для новой вьюшки сканирования
  static createScanViewConfig(
    networkType: ReoSpace.IScanTypes,
    taskId: string,
    viewId?: string,
  ): any {
    return {
      viewId: viewId || `scan-${Date.now()}`,
      taskId,
      show: true,
      tabsModel: [
        {
          id: networkType,
          label: this.getTitleForNetworkType(networkType),
          icon: this.getIconForNetworkType(networkType),
          badge: 0,
          data: {
            metaInfo: {
              scanType: networkType,
              scanStatus: ReoSpace.IScanStatusTypes.Pending,
              currentScanCycle: 0,
            },
            rows: [],
            hasNewData: false,
          },
        },
      ],
    }
  }

  // Получить описание для типа сети
  static getNetworkTypeDescription(networkType: ReoSpace.IScanTypes): string {
    const descriptions: Record<ReoSpace.IScanTypes, string> = {
      [ReoSpace.IScanTypes.Gsm]: 'GSM сети 900/1800 MHz, 2G технология',
      [ReoSpace.IScanTypes.Lte]: 'LTE сети (4G), высокоскоростная мобильная связь',
      [ReoSpace.IScanTypes.Umts]: 'UMTS сети (3G), широкополосная мобильная связь',
      [ReoSpace.IScanTypes.FiveG]: '5G сети, новейшее поколение мобильной связи',
      [ReoSpace.IScanTypes.Wifi]: 'Wi-Fi сети 2.4/5 GHz, беспроводные локальные сети',
      [ReoSpace.IScanTypes.Bluetooth]: 'Bluetooth устройства, короткодистанционная связь',
      [ReoSpace.IScanTypes.Unknown]: 'Такой тип связи не опознан или не поддерживается',
    }
    return descriptions[networkType] || 'Сети связи'
  }
}
