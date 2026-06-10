import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    netlify(),
    viteReact(),
    tailwindcss(),
    devtools(),
  ],
});
