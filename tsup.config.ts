import { defineConfig } from 'tsup';

export default defineConfig({
   entry: ['src/index.ts'],
   outDir: 'dist',
   format: ['esm'],
   target: 'node24',
   sourcemap: true,
   dts: true,
   minify: true,
   clean: true
});
