import fs from "fs";
import { toKebabCase } from "../Utils/Helpers";
import {
  GEN_THEMES_OUT_DIR,
  THEMES_JSON_PATH,
  TAILWIND_CSS_COLORS_FILE_NAME,
  THEMES_ROOT_DIR,
} from "../Config/Global.config";

fs.mkdirSync(GEN_THEMES_OUT_DIR, { recursive: true });

const themesData = JSON.parse(fs.readFileSync(THEMES_JSON_PATH, "utf-8"));

const allRoles = new Set<string>();

function collectRoles(palette: any) {
  if (!palette || typeof palette !== "object") return;
  for (const variant of ["main", "hc", "mc"]) {
    if (palette[variant]) {
      Object.keys(palette[variant]).forEach((key) => allRoles.add(key));
    }
  }
}

function generateTailwindColorsCssFile() {
  themesData.themes.forEach((theme: any) => {
    if (theme.lightPalette) collectRoles(theme.lightPalette);
    if (theme.darkPalette) collectRoles(theme.darkPalette);
  });

  const tokens = Array.from(allRoles).sort();

  const kebabTokens = tokens.map((token: string) => toKebabCase(token));

  const lines = [
    `/* ${GEN_THEMES_OUT_DIR}/${TAILWIND_CSS_COLORS_FILE_NAME}`,
    ` Автоматически сгенерировано — НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!`,
    ` Запуск: npm run generate:themes`,
    `*/`,
    `@import 'tailwindcss';`,
    ``,
    `@theme {`,
  ];

  kebabTokens.forEach((token: string) => {
    const varName = `--md-sys-color-${token.replace(
      /[A-Z]/g,
      (m) => "-" + m.toLowerCase()
    )}`;
    lines.push(`    --color-${token}: var(${varName});`);
  });

  lines.push(`}`);

  fs.writeFileSync(TAILWIND_CSS_COLORS_FILE_NAME, lines.join("\n"));
  console.log(`Generated: ${TAILWIND_CSS_COLORS_FILE_NAME}`);
}

function traverseThemes() {
  fs.readdir(THEMES_ROOT_DIR, (err, files) => {
    if (err) {
      console.error("Error reading theme config directory:", err);
      return;
    }

    const themeDirs = [];

    files.forEach((file) => {
      console.log(`Found theme: ${file}`);
      const filePath = `${THEMES_ROOT_DIR}/${file}`;
      themeDirs.push(filePath);
    });
  });
}

traverseThemes();
generateTailwindColorsCssFile();
