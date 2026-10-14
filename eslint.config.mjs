// @ts-check

import js from '@eslint/js';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig(
   eslint.configs.recommended,
   tseslint.configs.recommended,
   {
      extends: [js.configs.recommended, tseslint.configs.recommended],
      plugins: {
         'simple-import-sort': simpleImportSort,
         'unused-imports': unusedImports
      },
      rules: {
         'simple-import-sort/imports': 'error',
         'simple-import-sort/exports': 'error',
         'unused-imports/no-unused-imports': 'error',
         'unused-imports/no-unused-vars': [
            'warn',
            {
               argsIgnorePattern: '^_',
               varsIgnorePattern: '^_'
            }
         ]
      }
   },
   prettier
);
