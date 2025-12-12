# Preact Vite Bundle Boilerplate

# `create-preact`

<h2 align="center">
  <img height="256" width="256" src="./Src/Assets/LogoStc.svg">
</h2>

<h3 align="center">Custom Preact Boilerplate for STC needs!</h3>

## Getting Started

- `npm install` - Install all deps if first time. Good luck, have fun!

- `npm run dev` - Starts a dev server at http://localhost:5173/

- `npm run dev:reconfigure` - Starts a dev server but before reconfigures themes on repo side using python and calls other theme scripts to update on the preact project side

- `npm run build` - Builds for production, emitting to `dist/`

- `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally

- `generate:process-python-theme`: Start it first when you changed something in ForensicTheme repo or configuring project first time. This script incapsulated inside generate:theme script in package.json so you do not need to call it first if you call dev:reconfigure or generate:themes.

- `register:themes`: Generate some meta types in `./Autogen/Themes/ForensicThemes` directory needs to import stuff almost on fly.

- `npm run generate:theme-tailwind` - Generates Tailwind port for basic forensic theme which is Material Builder tokenized
