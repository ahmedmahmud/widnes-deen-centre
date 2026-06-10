import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      deployment: {
        preset: process.env.NITRO_PRESET || "node-server",
      },
      server: {
        preset: process.env.NITRO_PRESET || "node-server",
        publicAssets: [
          {
            dir: "./dist/client",
            maxAge: 31536000,
          },
        ],
      },
    }),
    viteReact(),
    tailwindcss(),
    devtools(),
  ],
});
