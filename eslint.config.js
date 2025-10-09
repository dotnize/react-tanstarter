import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    ...pluginQuery.configs["flat/recommended"],
    ...pluginRouter.configs["flat/recommended"],
    reactHooks.configs.flat.recommended,
    react.configs["recommended-type-checked"],
    // ...you can add plugins or configs here
  ],
  rules: {
    // You can override any rules here
    "@typescript-eslint/no-deprecated": "warn",
  },
  ignores: ["dist", ".wrangler", ".vercel", ".netlify", ".output", "build/"],
});
