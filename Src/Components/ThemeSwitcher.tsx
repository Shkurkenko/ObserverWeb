// src/components/ThemeSwitcher.tsx
import { useState, useEffect, useCallback } from "preact/hooks";
import { ThemeName } from "../../Autogen/Themes/ForensicThemes/Theme.registry";
import { toKebabCase } from "../../Utils/Helpers";

const themes = {
  ForensicGreen: {
    light: async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/light.css?raw"
      ),
    "light-hc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw"
      ),
    "light-mc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/light-mid-contrast.css?raw"
      ),
    dark: async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark.css?raw"
      ),
    "dark-hc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw"
      ),
    "dark-mc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-mid-contrast.css?raw"
      ),
  },
  ForensicBlue: {
    light: async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/light.css?raw"
      ),
    "light-hc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw"
      ),
    "light-mc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/light-mid-contrast.css?raw"
      ),
    dark: async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark.css?raw"
      ),
    "dark-hc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw"
      ),
    "dark-mc": async () =>
      await import(
        "../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-mid-contrast.css?raw"
      ),
  },
} as const;

export type Theme = keyof typeof themes;
export type Variant = keyof (typeof themes)[Theme];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("ForensicGreen");
  const [variant, setVariant] = useState<Variant>("dark");

  const getClassNameFromThemeName = useCallback(
    (themeName: ThemeName | string) => {
      return `theme-${toKebabCase(themeName)}`;
    },
    []
  );

  // Change available class names from css exported theme css files and makes something like :root {...} css
  const validCssClass = useCallback((css: string) => {
    return css
      .replace(".dark", ":root")
      .replace(".dark-hc", ":root")
      .replace(".dark-mc", ":root")
      .replace(".light", ":root")
      .replace(".light-hc", ":root")
      .replace(".light-mc", ":root")
      .replace("-high-contrast", "")
      .replace("-mid-contrast", "");
  }, []);

  useEffect(() => {
    const apply = async () => {
      const prev = document.getElementById("dynamic-theme");
      if (prev) prev.remove();

      const mod = await themes[theme][variant]();
      const css = (mod as { default: string }).default;

      const style = document.createElement("style");
      style.id = "dynamic-theme";
      style.textContent = validCssClass(css);
      document.head.appendChild(style);

      console.log(theme + " " + variant + ": ", style);

      document.documentElement.className = "";
      document.documentElement.classList.add(
        getClassNameFromThemeName(theme),
        variant.includes("dark") ? "dark" : "light"
      );
    };

    apply();
  }, [theme, variant]);

  const variants = Object.keys(themes[theme]) as Variant[];

  return (
    <div class="fixed top-4 right-4 z-50 bg-surface-container-lowest p-6 rounded-3xl shadow-2xl border border-outline-variant/20">
      <select
        aria-label="Theme selection"
        value={theme}
        onChange={(e) =>
          setTheme((e.target as HTMLSelectElement).value as Theme)
        }
        class="w-full bg-surface-container-high text-on-surface px-4 py-3 rounded-xl mb-4"
      >
        <option value="ForensicGreen">Forensic Green</option>
        <option value="ForensicBlue">Forensic Blue</option>
      </select>

      <div class="grid grid-cols-3 gap-2">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            class={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              variant === v
                ? "bg-inverse-primary text-on-primary shadow-lg"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {v
              .replace(/-/g, " ")
              .replace("hc", "high contrast")
              .replace("mc", "mid contrast")}
          </button>
        ))}
      </div>
    </div>
  );
}
