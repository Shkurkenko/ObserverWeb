import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const PROJECT_ROOT = resolve(__dirname, '../')

export const APP_NAME = 'Наблюдатель'
export const APP_VERSION = '0.1.0'
export const APP_DESCRIPTION = 'Инструмент для анализа цифровых следов.'

export const THEMES_ROOT_DIR = resolve(PROJECT_ROOT, 'Config/Themes/ForensicThemes/WEB')
export const THEMES_CSS_DIR = resolve
export const GEN_THEMES_OUT_DIR = resolve(PROJECT_ROOT, 'Autogen/Themes/ForensicThemes')
export const THEMES_JSON_PATH = resolve(PROJECT_ROOT, 'Config/Themes/ForensicThemes/themes.json')

export const THEMES_TYPES_OUTPUT_FILE_PATH = join(PROJECT_ROOT, 'Src/Lib/Themes/Themes.types.ts')

export const THEMES_REGISTRY_OUTPUT_FILE_PATH = join(
  PROJECT_ROOT,
  'Src/Lib/Themes/Themes.registry.ts',
)

export const DEFAULT_THEME_NAME = 'ForensicGreen'

export const TAILWIND_COLORS_FILE_NAME = join(
  PROJECT_ROOT,
  'Autogen/Themes/ForensicThemes/TailwindAutogen.ts',
)

export const TAILWIND_CSS_COLORS_FILE_NAME = join(
  PROJECT_ROOT,
  'Autogen/Themes/ForensicThemes/TailwindAutogen.css',
)
