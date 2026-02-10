import fs from 'fs'
import path from 'path'
import {
  getDeviceInfo,
  getBatteryInfo,
  getNetworkInfo,
  getStorageInfo,
  getDisplayInfo,
} from 'tauri-plugin-device-info-api'

async function loadDeviceInfo() {
  // Device information
  const device = await getDeviceInfo()
  console.log(`Device: ${device.model}`)
  console.log(`Manufacturer: ${device.manufacturer}`)

  const battery = await getBatteryInfo()
  console.log(`Battery: ${battery.level}%`)
  console.log(`Charging: ${battery.isCharging}`)

  const network = await getNetworkInfo()
  console.log(`IP: ${network.ipAddress}`)
  console.log(`Type: ${network.networkType}`)
  console.log(`Mac: ${network.macAddress}`)

  const storage = await getStorageInfo()
  console.log(`Total: ${storage.totalSpace} bytes`)
  console.log(`Free: ${storage.freeSpace} bytes`)
}

/**
 * Форматирует количество секунд в читаемый вид (чч:мм:сс)
 * @param seconds - количество секунд
 * @returns отформатированная строка времени
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 0) return '0 секунд'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours} ${getRussianWord(hours, ['час', 'часа', 'часов'])}`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${getRussianWord(minutes, ['минута', 'минуты', 'минут'])}`)
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} ${getRussianWord(secs, ['секунда', 'секунды', 'секунд'])}`)
  }

  return parts.join(' ')
}

// Вспомогательная функция для склонения русских слов
export const getRussianWord = (number: number, words: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  return words[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
}

/**
 * Преобразует любой строковый ключ в kebab-case
 * "primaryContainer"  → "primary-container"
 * "onPrimary"         → "on-primary"
 * "surfaceTint"       → "surface-tint"
 * "surface-container-lowest" → "surface-container-lowest" (остаётся как есть)
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1') // Вставляем дефис перед каждой заглавной
    .replace(/^-/, '') // Убираем дефис в начале, если был
    .replace(/_/g, '-') // Поддержка underscore → kebab
    .toLowerCase()
}

/**
 * Real meta shit to generate keys array of strings from interface
 */
export function getInterfaceKeys<T extends object>(obj?: T): (keyof T & string)[] {
  return Object.keys({} as T) as (keyof T & string)[]
}

/**
 * Создаёт файл + все папки по пути, если их нет
 * @param filePath Полный путь к файлу (например: 'src/generated/themes/dark/config.json')
 * @param content Содержимое файла (по умолчанию пустая строка)
 */
export function writeFileWithDirs(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
