import type { Config } from "tailwindcss";
import forensicTailwindColorScheme from "./Autogen/Themes/ForensicThemes/TailwindColors";

const config: Config = {
  darkMode: "class",
  content: [
    "./public/*.html",
    "./index.html",
    "./Src/**/*.{ts, tsx, html, css}",
    "./Autogen/**/*.{ts, tsx, css}",
    "./Config/**/*.{ts, tsx, css}",
  ],
  plugins: [],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--md-sys-color-background)",
      //   error: "var(--md-sys-color-error)",
      //   "error-container": "var(--md-sys-color-error-container)",
      //   highest: "var(--md-sys-color-highest))",
      //   "inverse-on-surface": "var(--md-sys-color-inverse-on-surface)",
      //   "inverse-primary": "var(--md-sys-color-inverse-primary)",
      //   "inverse-surface": "var(--md-sys-color-inverse-surface)",
      //   "on-background": "var(--md-sys-color-on-background)",
      //   "on-error": "var(--md-sys-color-on-error)",
      //   "on-error-container": "var(--md-sys-color-on-error-container)",
      //   "on-primary": "var(--md-sys-color-on-primary)",
      //   "on-primary-container": "var(--md-sys-color-on-primary-container)",
      //   "on-primary-fixed": "var(--md-sys-color-on-primary-fixed)",
      //   "on-primary-fixed-variant":
      //     "var(--md-sys-color-on-primary-fixed-variant)",
      //   "on-secondary": "var(--md-sys-color-on-secondary)",
      //   "on-secondary-container": "var(--md-sys-color-on-secondary-container)",
      //   "on-secondary-fixed": "var(--md-sys-color-on-secondary-fixed)",
      //   "on-secondary-fixed-variant":
      //     "var(--md-sys-color-on-secondary-fixed-variant)",
      //   "on-surface": "var(--md-sys-color-on-surface)",
      //   "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
      //   "on-tertiary": "var(--md-sys-color-on-tertiary)",
      //   "on-tertiary-container": "var(--md-sys-color-on-tertiary-container)",
      //   "on-tertiary-fixed": "var(--md-sys-color-on-tertiary-fixed)",
      //   "on-tertiary-fixed-variant":
      //     "var(--md-sys-color-on-tertiary-fixed-variant)",
      //   outline: "var(--md-sys-color-outline)",
      //   "outline-variant": "var(--md-sys-color-outline-variant)",
      //   primary: "var(--md-sys-color-primary)",
      //   "primary-container": "var(--md-sys-color-primary-container)",
      //   "primary-fixed": "var(--md-sys-color-primary-fixed)",
      //   "primary-fixed-dim": "var(--md-sys-color-primary-fixed-dim)",
      //   scrim: "var(--md-sys-color-scrim)",
      //   secondary: "var(--md-sys-color-secondary",
      //   "secondary-container": "var(--md-sys-color-secondary-container)",
      //   "secondary-fixed": "var(--md-sys-color-secondary-fixed)",
      //   "secondary-fixed-dim": "var(--md-sys-color-secondary-fixed-dim)",
      //   shadow: "var(--md-sys-color-shadow)",
      //   surface: "var(--md-sys-color-surface)",
      //   "surface-bright": "var(--md-sys-color-surface-bright)",
      //   "surface-container": "var(--md-sys-color-surface-container)",
      //   "surface-container-high": "var(--md-sys-color-surface-container-high)",
      //   "surface-container-highest":
      //     "var(--md-sys-color-surface-container-highest)",
      //   "surface-container-low": "var(--md-sys-color-surface-container-low)",
      //   "surface-container-lowest":
      //     "var(--md-sys-color-surface-container-lowest)",
      //   "surface-dim": "var(--md-sys-color-surface-dim)",
      //   "surface-tint": "var(--md-sys-color-surface-tint)",
      //   "surface-variant": "var(--md-sys-color-surface-variant)",
      //   tertiary: "var(--md-sys-color-tertiary)",
      //   "tertiary-container": "var(--md-sys-color-tertiary-container)",
      //   "tertiary-fixed": "var(--md-sys-color-tertiary-fixed)",
      //   "tertiary-fixed-dim": "var(--md-sys-color-tertiary-fixed-dim)",
      // },

      // colors: forensicTailwindColorScheme,
    },
  },
};

export default config;
