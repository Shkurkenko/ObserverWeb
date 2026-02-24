import fs from 'fs'
import path from 'path'
import {
  getDeviceInfo,
  getBatteryInfo,
  getNetworkInfo,
  getStorageInfo,
  getDisplayInfo,
} from 'tauri-plugin-device-info-api'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Theme, Variant } from '@Context/ThemeContext'
import { Themes } from '@Config/Themes/Theme.types'

export type DynamicCallback = (...args: any[]) => void

export async function initializeDefaultTheme() {
  const defaultTheme: Theme = 'ForensicBlue'
  const defaultVariant: Variant = 'dark'

  const loadDefaultTheme = async () => {
    try {
      const mod = await Themes[defaultTheme][defaultVariant]()
      const css = (mod as { default: string }).default

      const style = document.createElement('style')
      style.id = 'dynamic-theme-initial'
      style.textContent = css
        .replace('.dark', ':root')
        .replace('.dark-hc', ':root')
        .replace('.dark-mc', ':root')
        .replace('.light', ':root')
        .replace('.light-hc', ':root')
        .replace('.light-mc', ':root')
        .replace('-high-contrast', '')
        .replace('-mid-contrast', '')

      document.head.appendChild(style)

      document.documentElement.classList.add(
        `theme-${defaultTheme.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2')}`,
        defaultVariant.includes('dark') ? 'dark' : 'light',
      )

      console.log('Default theme loaded')
    } catch (error) {
      console.error('Failed to load default theme: ', error)
    }
  }

  await loadDefaultTheme()
}

async function loadDeviceInfo() {
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

export function inRange(num: number, firstNum: number, secondNum: number): boolean {
  const max = Math.max(firstNum, secondNum)
  const min = Math.min(firstNum, secondNum)
  return num >= min && num <= max
}

export function getRandomIntegerInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomEnumValue<T extends Record<any, any>>(enumeration: T): T[keyof T] {
  const keys = Object.values(enumeration) as Array<T[keyof T]>
  const idx = getRandomIntegerInclusive(0, keys.length - 1)
  return keys[idx]
}

export function getTimeNow(): number {
  return Date.now()
}

export function runWithInterval<T>(
  data: T[],
  intervalMs: number,
  times: number,
  cb: DynamicCallback,
) {
  const timeouts: NodeJS.Timeout[] = []
  for (let i = 0; i < times; i++) {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (data[i] !== undefined && data[i] !== null) cb(data[i])
    }, intervalMs * i)

    timeouts.push(timeout)
  }

  return () => {
    timeouts.forEach((t) => clearTimeout(t))
  }
}

export function getCurrentDDMMYY() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0') // +1 because months are 0-indexed
  const year = String(now.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

export function getCurrentTime24() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
