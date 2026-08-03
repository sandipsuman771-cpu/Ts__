import { defineConfig } from 'vite';

export default defineConfig({
  // Set the base to './' to ensure relative paths for assets are used in the build.
  // This is required for GitHub Pages deployments where the site is served from a subdirectory.
  base: './',
});
