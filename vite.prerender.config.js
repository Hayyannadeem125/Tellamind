import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/Tellamind/' : '/',
  publicDir: false,
  ssr: { noExternal: ['react-router-dom', 'react-router'] },
  build: {
    ssr: 'src/entry-prerender.jsx',
    outDir: '.prerender',
    emptyOutDir: true,
  },
});
