import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // <- gir deg window/document
    // setupFiles: ['./vitest.setup.ts'], // valgfritt
  },
});
