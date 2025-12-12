import fs from "fs";
import path from "path";

/**
 * Преобразует любой строковый ключ в kebab-case
 * "primaryContainer"  → "primary-container"
 * "onPrimary"         → "on-primary"
 * "surfaceTint"       → "surface-tint"
 * "surface-container-lowest" → "surface-container-lowest" (остаётся как есть)
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1") // Вставляем дефис перед каждой заглавной
    .replace(/^-/, "") // Убираем дефис в начале, если был
    .replace(/_/g, "-") // Поддержка underscore → kebab
    .toLowerCase();
}

/**
 * Real meta shit to generate keys array of strings from interface
 */
export function getInterfaceKeys<T extends object>(
  obj?: T
): (keyof T & string)[] {
  return Object.keys({} as T) as (keyof T & string)[];
}

/**
 * Создаёт файл + все папки по пути, если их нет
 * @param filePath Полный путь к файлу (например: 'src/generated/themes/dark/config.json')
 * @param content Содержимое файла (по умолчанию пустая строка)
 */
export function writeFileWithDirs(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
