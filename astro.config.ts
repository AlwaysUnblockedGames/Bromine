// @ts-check
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import node from '@astrojs/node';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://hyperion-proxy.netlify.app',
  integrations: [icon(), partytown()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js', 
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash][extname]', 
        },
      },
    },
    ssr: {
      noExternal: ['astro-icon'],
    },
    plugins: [tailwindcss()],
  },
});

if (process.env.DEBUG) {
  console.log("Telemetry Debugging Enabled");
}
