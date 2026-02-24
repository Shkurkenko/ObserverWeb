import { useState, useEffect, useCallback } from 'preact/hooks'
import { ThemeName } from '../../../Autogen/Themes/ForensicThemes/Theme.registry'
import { toKebabCase } from '../../../Utils/Helpers'
import { Theme, Variant } from '@Config/Themes/Theme.types'
import { Themes } from '@Config/Themes/Theme.types'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('ForensicGreen')
  const [variant, setVariant] = useState<Variant>('dark')

  const getClassNameFromThemeName = useCallback((themeName: ThemeName | string) => {
    return `theme-${toKebabCase(themeName)}`
  }, [])

  // Change available class names from css exported theme css files and makes something like :root {...} css
  const validCssClass = useCallback((css: string) => {
    return css
      .replace('.dark', ':root')
      .replace('.dark-hc', ':root')
      .replace('.dark-mc', ':root')
      .replace('.light', ':root')
      .replace('.light-hc', ':root')
      .replace('.light-mc', ':root')
      .replace('-high-contrast', '')
      .replace('-mid-contrast', '')
  }, [])

  useEffect(() => {
    const apply = async () => {
      const prev = document.getElementById('dynamic-theme')
      if (prev) prev.remove()

      const mod = await Themes[theme][variant]()
      const css = (mod as { default: string }).default

      const style = document.createElement('style')
      style.id = 'dynamic-theme'
      style.textContent = validCssClass(css)
      document.head.appendChild(style)

      document.documentElement.className = ''
      document.documentElement.classList.add(
        getClassNameFromThemeName(theme),
        variant.includes('dark') ? 'dark' : 'light',
      )
    }

    apply()
  }, [theme, variant])

  const variants = Object.keys(Themes[theme]) as Variant[]

  return (
    <div class='fixed top-4 right-4 z-50 bg-surface-container-lowest p-6 rounded-3xl shadow-2xl border border-outline-variant/20'>
      <select
        aria-label='Theme selection'
        value={theme}
        onChange={(e) => setTheme((e.target as HTMLSelectElement).value as Theme)}
        class='w-full bg-surface-container-high text-on-surface px-4 py-3 rounded-xl mb-4'
      >
        <option value='ForensicGreen'>Forensic Green</option>
        <option value='ForensicBlue'>Forensic Blue</option>
      </select>

      <div class='grid grid-cols-3 gap-2'>
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            class={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              variant === v
                ? 'bg-inverse-primary text-on-primary shadow-lg'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {v.replace(/-/g, ' ').replace('hc', 'high contrast').replace('mc', 'mid contrast')}
          </button>
        ))}
      </div>
    </div>
  )
}
