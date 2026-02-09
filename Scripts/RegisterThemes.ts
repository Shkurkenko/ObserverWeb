import fs from 'fs'
import path from 'path'
import { PROJECT_ROOT, THEMES_ROOT_DIR } from '../Config/Global.config'
import { writeFileWithDirs } from '../Utils/Helpers'

const root = PROJECT_ROOT
const themesDir = path.join(root, 'Config/Themes/ForensicThemes/WEB')
const outputFile = path.join(root, 'Autogen/Themes/ForensicThemes/Theme.registry.ts')

const folders = fs.readdirSync(themesDir).filter((name) => {
  const fullPath = path.join(themesDir, name)
  return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'config.ts'))
})

let typesContent = `// Автоматически сгенерировано — не редактируй!\n\n`
let registryContent = `// Автоматически сгенерировано\n\n`

// Генерируем импорты и типы
folders.forEach((folder) => {
  const pascalName = folder.charAt(0).toUpperCase() + folder.slice(1)
  const importName = `${pascalName}Theme`

  typesContent += `import type { IThemeConfig as ${importName} } from '${THEMES_ROOT_DIR}/${folder}/config';\n`
  registryContent += `import type { IThemeConfig as ${importName} } from '${THEMES_ROOT_DIR}/${folder}/config';\n`
})

typesContent += `\n// Все доступные темы\nexport type AvailableThemes = {\n`
folders.forEach((folder) => {
  const pascalName = folder.charAt(0).toUpperCase() + folder.slice(1)
  typesContent += `  '${folder}': ${pascalName}Theme;\n`
})
typesContent += `};\n\n`

registryContent += `\nexport const themeRegistry = {\n`
folders.forEach((folder) => {
  const pascalName = folder.charAt(0).toUpperCase() + folder.slice(1)
  registryContent += `  '${folder}': () => import('${THEMES_ROOT_DIR}/${folder}/config').then(m => m.default || m),\n`
})
registryContent += `} as const;\n\n`

registryContent += `export type ThemeName = keyof typeof themeRegistry;\n`

// Записываем два файла
writeFileWithDirs(path.join(root, 'Autogen/Themes/ForensicThemes/Theme.types.ts'), typesContent)

fs.writeFileSync(outputFile, registryContent)

console.log(`\n\nОбнаружено тем: ${folders.length} → ${folders.join(', ')}`)
console.log('Theme.registry.ts и Theme.types.ts сгенерированы!\n\n')
