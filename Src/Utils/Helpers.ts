import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ObserverConfig, ThemeEngine } from '../../Config/ObserverConfig'

export type DynamicCallback = (...args: any[]) => void

export async function initializeDefaultTheme() {
  const defaultTheme: ThemeEngine.Theme = 'ForensicBlue'
  const defaultVariant: ThemeEngine.Variant = 'dark'

  const loadDefaultTheme = async () => {
    try {
      const mod = await ThemeEngine.Themes[defaultTheme][defaultVariant]()
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
