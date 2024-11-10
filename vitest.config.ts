// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

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
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
});
