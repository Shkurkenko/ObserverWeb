import { useEffect } from 'preact/hooks'
import { ThemeProvider } from '../Src/Context/ThemeContext'
import { ComponentChildren } from 'preact'
import { ThemeEngine } from '../Config/ObserverConfig'

export interface IThemeDecoratorProps {
  children: ComponentChildren
}

export const ThemeDecorator = ({ children }: IThemeDecoratorProps) => {
  // Принудительная загрузка дефолтной темы сразу
  useEffect(() => {
    const loadDefaultTheme = async () => {
      try {
        const mod = await ThemeEngine.Themes.ForensicGreen.dark()
        const css = (mod as { default: string }).default

        // Проверяем, не загружена ли уже тема
        if (!document.getElementById('storybook-initial-theme')) {
          const style = document.createElement('style')
          style.id = 'storybook-initial-theme'
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
          document.documentElement.classList.add('theme-forensic-green', 'dark')
          console.log('Storybook theme initialized')
        }
      } catch (error) {
        console.error('Storybook theme load error:', error)
      }
    }

    // Загружаем тему синхронно
    loadDefaultTheme()
  })

  return <ThemeProvider>{children}</ThemeProvider>
}
