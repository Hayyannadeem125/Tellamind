import { defineConfig } from 'vite';

// GitHub Pages publishes this repo under /Tellamind/; local development stays at /.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/Tellamind/' : '/',
});
