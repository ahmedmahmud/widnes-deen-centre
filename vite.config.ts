import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import type { Plugin } from 'vite'

/**
 * Workaround for a TanStack Start issue where server-only code from
 * @tanstack/router-core/ssr/server and @tanstack/start-storage-context
 * leaks into the client bundle through barrel re-exports.
 * 
 * These modules import Node built-ins (node:stream, node:async_hooks, etc.)
 * which Vite externalizes as __vite-browser-external, but Rollup then fails
 * because the named exports don't exist on the browser-external stub.
 * 
 * This plugin stubs out the Node built-in modules in the client environment
 * with empty exports so Rollup can complete the bundle. The server code that
 * uses these modules is dead code in the client bundle anyway (the TanStack
 * Start compiler replaces server fn handlers with RPC stubs).
 */
function stubNodeBuiltinsInClient(): Plugin {
  const STUB_ID = '\0stub-node-builtin'
  
  // Node built-in modules that leak into the client bundle
  const nodeBuiltins = new Set([
    'node:stream',
    'node:stream/web',
    'node:async_hooks',
    'stream',
    'async_hooks',
  ])

  return {
    name: 'stub-node-builtins-in-client',
    enforce: 'pre',
    applyToEnvironment(environment) {
      return environment.name === 'client'
    },
    resolveId(id) {
      if (nodeBuiltins.has(id)) {
        return { id: `${STUB_ID}:${id}`, moduleSideEffects: false }
      }
    },
    load(id) {
      if (id.startsWith(STUB_ID)) {
        // Provide stub exports for all known named exports used by the leaking modules
        return [
          'export const Readable = undefined;',
          'export const ReadableStream = undefined;',
          'export const PassThrough = undefined;',
          'export const Writable = undefined;',
          'export const Transform = undefined;',
          'export const Duplex = undefined;',
          'export const Stream = undefined;',
          'export const AsyncLocalStorage = undefined;',
          'export const AsyncResource = undefined;',
          'export default {};',
        ].join('\n')
      }
    },
  }
}

const config = defineConfig({
  plugins: [
    stubNodeBuiltinsInClient(),
    devtools(),
    tailwindcss(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    viteReact(),
    nitro(),
  ],
})

export default config
