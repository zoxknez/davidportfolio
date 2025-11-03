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
    ],
  },
  {
    rules: {
      // Ignore incorrect Tailwind CSS class warnings
      "@next/next/no-css-tags": "off",
      // Ignore Tailwind CSS class suggestions
      "tailwindcss/classnames-order": "off",
      // Allow unused vars in some cases
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
