import globals from "globals";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
//import { defineConfig } from "eslint/config";


//export default defineConfig([
//  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
//]);

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': 'off',
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
  },
  { 
    ignores: [
      'src/backend/index_nomongodb.cjs',
      'dist/**',
    ], 
  },
]
