import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// import nodePolyfills from 'rollup-plugin-polyfill-node'

const isProd = process.env.NODE_ENV === 'production'

const noExternal: string[] = []
if (isProd) {
    noExternal.push(
        ...[
            // Needs to be pre-processed by Vite in production
            '@mui/base',
            '@mui/icons-material',
            '@mui/material',
            '@mui/utils',
            '@mui/x-data-grid',
            '@emotion/react',
            '@emotion/styled',
            'mongodb',
            'mongoose',
            'uuid',
            'clsx',
            'undici',
            '@supabase*',
            'stream-browserify',
        ]
    )
}

export default defineConfig(() => {
  return {
    plugins: [
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          'fs', // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        // protocolImports: true,
      }), 
      qwikCity(), qwikVite(), tsconfigPaths(), qwikReact()
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    ssr: {
      noExternal
    },
    // build: {
    //   rollupOptions: {
    //     plugins: [
    //       nodePolyfills(),
    //     ],
    //   },
    // },
    // optimizeDeps: {
    //   esbuildOptions: {
    //       // Node.js global to browser globalThis
    //       define: {
    //           global: 'globalThis'
    //       },
    //       // Enable esbuild polyfill plugins
    //       plugins: [
    //           NodeGlobalsPolyfillPlugin({
    //               process: true,
    //               buffer: true
    //           }),
    //           NodeModulesPolyfillPlugin(),
    //       ]
    //   },
    // },
    resolve: {
      alias: {
        // stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        // url: 'rollup-plugin-node-polyfills/polyfills/url',
      },
    },
    // server: {
    //   hmr:{
    //     overlay: false,
    //   },
    // },
  };
});
