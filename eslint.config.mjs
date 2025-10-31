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
  ]),
  {
    rules: {
      // Ignore incorrect Tailwind CSS class warnings
      "@next/next/no-css-tags": "off",
      // Ignore Tailwind CSS class suggestions (bg-gradient-to-b is valid)
      "tailwindcss/classnames-order": "off",
    },
  },
]);

export default eslintConfig;
