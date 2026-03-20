import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy prototype files not used by the current app/router architecture:
    "conversions.test.ts",
    "cooking-density-converter.tsx",
    "file-size-conversions.ts",
    "generic-calculator.tsx",
    "ingredients.ts",
    "lib/content/file-size-intent-pages.ts",
    "lib/content/time-conversions.ts",
  ]),
]);

export default eslintConfig;
