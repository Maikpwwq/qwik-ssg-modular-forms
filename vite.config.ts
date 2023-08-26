import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
// import { nodePolyfills } from 'vite-plugin-node-polyfills' // pnpm i --save-dev vite-plugin-node-polyfills
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";

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
            '@supabase*',
        ]
    )
}

export default defineConfig(() => {
  return {
    plugins: [
      // nodePolyfills({
      //   // To exclude specific polyfills, add them to this list.
      //   exclude: [
      //     'fs', // Excludes the polyfill for `fs` and `node:fs`.
      //   ],
      //   // Whether to polyfill specific globals.
      //   globals: {
      //     // Buffer: true, // can also be 'build', 'dev', or false
      //     global: true,
      //     process: true,
      //   },
      //   // Whether to polyfill `node:` protocol imports.
      //   protocolImports: true,
      // }), 
      NgmiPolyfill(),
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
    // resolve: {
    //   alias: {
    //     // stream: 'stream-browserify',
    //     // 'node:stream': 'stream-browserify',
    //     // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
    //         // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
    //         // process and buffer are excluded because already managed
    //         // by node-globals-polyfill
    //         process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    //         buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    //         util: 'rollup-plugin-node-polyfills/polyfills/util',
    //         sys: 'util',
    //         events: 'rollup-plugin-node-polyfills/polyfills/events',
    //         stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    //         path: 'rollup-plugin-node-polyfills/polyfills/path',
    //         querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
    //         punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
    //         url: 'rollup-plugin-node-polyfills/polyfills/url',
    //         string_decoder:
    //             'rollup-plugin-node-polyfills/polyfills/string-decoder',
    //         http: 'rollup-plugin-node-polyfills/polyfills/http',
    //         https: 'rollup-plugin-node-polyfills/polyfills/http',
    //         os: 'rollup-plugin-node-polyfills/polyfills/os',
    //         assert: 'rollup-plugin-node-polyfills/polyfills/assert',
    //         constants: 'rollup-plugin-node-polyfills/polyfills/constants',
    //         _stream_duplex:
    //             'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
    //         _stream_passthrough:
    //             'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
    //         _stream_readable:
    //             'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
    //         _stream_writable:
    //             'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
    //         _stream_transform:
    //             'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
    //         timers: 'rollup-plugin-node-polyfills/polyfills/timers',
    //         console: 'rollup-plugin-node-polyfills/polyfills/console',
    //         vm: 'rollup-plugin-node-polyfills/polyfills/vm',
    //         zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
    //         tty: 'rollup-plugin-node-polyfills/polyfills/tty',
    //         domain: 'rollup-plugin-node-polyfills/polyfills/domain'
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
    //               // process: true,
    //               // buffer: true
    //           }),
    //           NodeModulesPolyfillPlugin(),
    //       ],
    //       target: "es2020",
    //   },
    // },
    // build: {
    //   target: "es2020",
    //   rollupOptions: {
    //     plugins: [
    //       rollupNodePolyFill(),
    //     ],
    //   },
    // },
    // server: {
    //   hmr:{
    //     overlay: false,
    //   },
    // },
  };
});
