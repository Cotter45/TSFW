// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/core/**/*.test.ts", "src/core/**/*.test.tsx"],
    coverage: {
      include: ["src/core/**"],
      exclude: [
        "src/core/routes.ts",
        "src/core/**/*.test.ts",
        "src/core/**/*.test.tsx",
      ],
      all: true,
    },
  },
});
