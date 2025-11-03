import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "vitest.config.ts",
      "vitest.setup.ts",
      "**/__tests__/**",
      "**/*.test.ts",
      "**/*.test.tsx",
    ],
  },
  {
    rules: {
      // Ignore incorrect Tailwind CSS class warnings
      "@next/next/no-css-tags": "off",
      // Ignore Tailwind CSS class suggestions
      "tailwindcss/classnames-order": "off",
    },
  },
]);

export default eslintConfig;
