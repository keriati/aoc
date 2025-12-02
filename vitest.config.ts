/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/*.spec.ts"],
    exclude: ["node_modules", "dist", ".git"],

    environment: "node",
    globals: true,
  },
});
