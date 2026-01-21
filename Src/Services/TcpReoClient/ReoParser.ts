import { ReoSpace } from '../../Shared/Interfaces/Reo.interface'
import { IRawScanMessage } from '.'
import { IScanData } from '.'
import { IParsedScanMessage } from '.'
import { IGsmScanData } from '.'
import { ILteScanData } from '.'
import { IUmtsScanData } from '.'
import { IWifiScanData } from '.'
import { IBluetoothScanData } from '.'

export class ScanReoDataParser {
  /**
   * Главный метод парсинга
   */
  static parseMessage(rawMessage: IRawScanMessage): IParsedScanMessage {
    const technology = this.detectTechnology(rawMessage.type)
    const timestamp = rawMessage.timestamp || Date.now()

    let parsedData: IScanData

    switch (technology) {
      case ReoSpace.IScanTypes.Gsm:
        parsedData = this.parseGsmData(rawMessage.data, timestamp)
        break
      case ReoSpace.IScanTypes.Umts:
        parsedData = this.parseUmtsData(rawMessage.data, timestamp)
        break
      case ReoSpace.IScanTypes.Lte:
        parsedData = this.parseLteData(rawMessage.data, timestamp)
        break
      case ReoSpace.IScanTypes.Wifi:
        parsedData = this.parseWifiData(rawMessage.data, timestamp)
        break
      case ReoSpace.IScanTypes.Bluetooth:
        parsedData = this.parseBluetoothData(rawMessage.data, timestamp)
        break
      default:
        // Для неизвестных типов - сохраняем сырые данные
        // Исключаем возможные конфликтные поля
        const { technology: _, timestamp: __, ...restData } = rawMessage.data
        parsedData = {
          technology: technology as any,
          timestamp,
          ...restData,
        } as IScanData
    }

    return {
      rawType: rawMessage.type,
      timestamp,
      data: parsedData,
    }
  }

  /**
   * Определяет технологию по строке типа
   */
  static detectTechnology(rawType: string): ReoSpace.IScanTypes {
    const type = rawType.toLowerCase()

    if (type.includes('bcch') || type.includes('gsm')) {
      return ReoSpace.IScanTypes.Gsm
    }
    if (type.includes('lte') || type.includes('e-utra')) {
      return ReoSpace.IScanTypes.Lte
    }
    if (type.includes('umts') || type.includes('wcdma') || type.includes('utra')) {
      return ReoSpace.IScanTypes.Umts
    }
    if (type.includes('wifi') || type.includes('802.11')) {
      return ReoSpace.IScanTypes.Wifi
    }
    if (type.includes('bluetooth') || type.includes('ble')) {
      return ReoSpace.IScanTypes.Bluetooth
    }

    return ReoSpace.IScanTypes.Unknown
  }

  /**
   * Парсинг GSM данных из BCCH-DL-SCH-Message
   */
  private static parseGsmData(rawData: Record<string, any>, timestamp: number): IGsmScanData {
    const data: IGsmScanData = {
      technology: ReoSpace.IScanTypes.Gsm,
      timestamp,
      mcc: 0,
      mnc: 0,
    }

    // Парсинг MCC/MNC
    if (rawData.MCC && rawData.MNC) {
      data.mcc = parseInt(rawData.MCC, 10)
      data.mnc = parseInt(rawData.MNC, 10)
    }

    // Cell Identity
    if (rawData.cellIdentity) {
      data.cellIdentity = rawData.cellIdentity
      // Конвертируем hex в decimal cell id если нужно
      try {
        const cleanHex = rawData.cellIdentity.replace(/\s/g, '')
        const cellIdNum = parseInt(cleanHex, 16)
        if (!isNaN(cellIdNum)) {
          data.cellId = cellIdNum.toString()
        }
      } catch {}
    }

    // LAC
    if (rawData.locationAreaCode) {
      data.lac = this.parseNumber(rawData.locationAreaCode)
    } else if (rawData.lac) {
      data.lac = this.parseNumber(rawData.lac)
    }

    // Частотные параметры
    if (rawData.arfcn !== undefined) {
      data.arfcn = this.parseNumber(rawData.arfcn)
    }

    // BSIC
    if (rawData.bsic !== undefined) {
      data.bsic = this.parseNumber(rawData.bsic)
    }

    // Уровень сигнала
    if (rawData.rxLev !== undefined) {
      data.rxLev = this.parseNumber(rawData.rxLev)
    }

    // Дополнительные поля
    if (rawData.c1 !== undefined) data.c1 = this.parseNumber(rawData.c1)
    if (rawData.c2 !== undefined) data.c2 = this.parseNumber(rawData.c2)
    if (rawData.raColorCode !== undefined) data.raColorCode = this.parseNumber(rawData.raColorCode)
    if (rawData.networkColorCode !== undefined)
      data.networkColorCode = this.parseNumber(rawData.networkColorCode)

    // Координаты если есть
    if (rawData.latitude && rawData.longitude) {
      data.coordinates = {
        lat: parseFloat(rawData.latitude),
        lon: parseFloat(rawData.longitude),
        accuracy: rawData.accuracy ? parseFloat(rawData.accuracy) : undefined,
      }
    }

    return data
  }

  /**
   * Парсинг UMTS данных
   */
  private static parseUmtsData(rawData: Record<string, any>, timestamp: number): IUmtsScanData {
    const data: IUmtsScanData = {
      technology: ReoSpace.IScanTypes.Umts,
      timestamp,
    }

    // MCC/MNC
    if (rawData.MCC && rawData.MNC) {
      data.mcc = parseInt(rawData.MCC, 10)
      data.mnc = parseInt(rawData.MNC, 10)
    }

    // LAC
    if (rawData.lac !== undefined) {
      data.lac = this.parseNumber(rawData.lac)
    }

    // Cell ID
    if (rawData.cellId) {
      data.cellId = rawData.cellId.toString()
    }

    // Частотные параметры
    if (rawData.uarfcn !== undefined) {
      data.uarfcn = this.parseNumber(rawData.uarfcn)
    }

    // PSC
    if (rawData.psc !== undefined) {
      data.psc = this.parseNumber(rawData.psc)
    }

    // Уровень сигнала
    if (rawData.rscp !== undefined) {
      data.rscp = this.parseNumber(rawData.rscp)
    }
    if (rawData.ecno !== undefined) {
      data.ecno = this.parseNumber(rawData.ecno)
    }
    if (rawData.cpichRscp !== undefined) {
      data.cpichRscp = this.parseNumber(rawData.cpichRscp)
    }
    if (rawData.cpichEcno !== undefined) {
      data.cpichEcno = this.parseNumber(rawData.cpichEcno)
    }
    if (rawData.pathloss !== undefined) {
      data.pathloss = this.parseNumber(rawData.pathloss)
    }

    // SIB данные
    if (rawData.sibData) {
      data.sibData = rawData.sibData
    }

    return data
  }

  /**
   * Парсинг LTE данных
   */
  private static parseLteData(rawData: Record<string, any>, timestamp: number): ILteScanData {
    const data: ILteScanData = {
      technology: ReoSpace.IScanTypes.Lte,
      timestamp,
      mcc: 0,
      mnc: 0,
    }

    // MCC/MNC
    if (rawData.MCC && rawData.MNC) {
      data.mcc = parseInt(rawData.MCC, 10)
      data.mnc = parseInt(rawData.MNC, 10)
    }

    // TAC
    if (rawData.trackingAreaCode) {
      data.tac = rawData.trackingAreaCode
    }

    // Cell Identity
    if (rawData.cellIdentity) {
      data.cellIdentity = rawData.cellIdentity
      try {
        const cleanHex = rawData.cellIdentity.replace(/\s/g, '')
        const cellIdNum = parseInt(cleanHex, 16)
        if (!isNaN(cellIdNum)) {
          data.cellId = cellIdNum.toString()
        }
      } catch {}
    }

    // PCI
    if (rawData.pci !== undefined) {
      data.pci = this.parseNumber(rawData.pci)
    }

    // EARFCN
    if (rawData.earfcn !== undefined) {
      data.earfcn = this.parseNumber(rawData.earfcn)
    }

    // Уровень сигнала
    if (rawData.rsrp !== undefined) {
      data.rsrp = this.parseNumber(rawData.rsrp)
    }
    if (rawData.rsrq !== undefined) {
      data.rsrq = this.parseNumber(rawData.rsrq)
    }
    if (rawData.sinr !== undefined) {
      data.sinr = this.parseNumber(rawData.sinr)
    }

    // Параметры сети
    if (rawData.bandwidth !== undefined) {
      data.bandwidth = this.parseNumber(rawData.bandwidth)
    }
    if (rawData.cqi !== undefined) {
      data.cqi = this.parseNumber(rawData.cqi)
    }

    return data
  }

  /**
   * Парсинг WiFi данных
   */
  private static parseWifiData(rawData: Record<string, any>, timestamp: number): IWifiScanData {
    const data: IWifiScanData = {
      technology: ReoSpace.IScanTypes.Wifi,
      timestamp,
      bssid: rawData.bssid || rawData.mac || '00:00:00:00:00:00',
      rssi: this.parseNumber(rawData.rssi || -100),
      channel: this.parseNumber(rawData.channel || 1),
    }

    // SSID
    if (rawData.ssid !== undefined) {
      data.ssid = rawData.ssid
      data.hidden = rawData.ssid === '' || rawData.hidden === true
    }

    // Частотные параметры
    if (rawData.frequency !== undefined) {
      data.frequency = this.parseNumber(rawData.frequency)
    }
    if (rawData.bandwidth !== undefined) {
      data.bandwidth = this.parseNumber(rawData.bandwidth)
    }

    // Безопасность
    if (rawData.security) {
      data.security = Array.isArray(rawData.security) ? rawData.security : [rawData.security]
    }
    if (rawData.encryption) {
      data.encryption = rawData.encryption
    }

    // Детали
    if (rawData.vendor) {
      data.vendor = rawData.vendor
    }
    if (rawData.capabilities) {
      data.capabilities = rawData.capabilities
    }
    if (rawData.standard) {
      data.standard = rawData.standard
    }
    if (rawData.maxRate !== undefined) {
      data.maxRate = this.parseNumber(rawData.maxRate)
    }

    return data
  }

  /**
   * Парсинг Bluetooth данных
   */
  private static parseBluetoothData(
    rawData: Record<string, any>,
    timestamp: number,
  ): IBluetoothScanData {
    const data: IBluetoothScanData = {
      technology: ReoSpace.IScanTypes.Bluetooth,
      timestamp,
      address: rawData.address || rawData.mac || '00:00:00:00:00:00',
      rssi: this.parseNumber(rawData.rssi || -100),
    }

    // Имя устройства
    if (rawData.name !== undefined) {
      data.name = rawData.name
    }

    // Класс устройства
    if (rawData.deviceClass !== undefined) {
      data.deviceClass = this.parseNumber(rawData.deviceClass)
    }
    if (rawData.majorDeviceClass) {
      data.majorDeviceClass = rawData.majorDeviceClass
    }
    if (rawData.minorDeviceClass) {
      data.minorDeviceClass = rawData.minorDeviceClass
    }

    // Сервисы
    if (rawData.serviceUuids) {
      data.serviceUuids = Array.isArray(rawData.serviceUuids)
        ? rawData.serviceUuids
        : [rawData.serviceUuids]
    }
    if (rawData.manufacturerData) {
      data.manufacturerData = rawData.manufacturerData
    }

    // Флаги
    if (rawData.connectable !== undefined) {
      data.connectable = Boolean(rawData.connectable)
    }
    if (rawData.paired !== undefined) {
      data.paired = Boolean(rawData.paired)
    }

    // Мощность передачи
    if (rawData.txPower !== undefined) {
      data.txPower = this.parseNumber(rawData.txPower)
    }

    return data
  }

  /**
   * Хелпер для парсинга чисел из разных форматов
   */
  private static parseNumber(value: any): number {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
      // Пробуем распарсить как десятичное число
      const num = parseFloat(value)
      if (!isNaN(num)) return num

      // Пробуем распарсить как hex
      const hex = parseInt(value, 16)
      if (!isNaN(hex)) return hex
    }
    return 0
  }
}
