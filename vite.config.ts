import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

const registeredPaths = new Set<string>();

function updateRouteTypes() {
  const typeFilePath = path.resolve(__dirname, "src/core/routes.ts");
  const routePaths =
    Array.from(registeredPaths)
      .map((route) => `"${route}"`)
      .join(" | ") || "string";

  const content = `// Auto-generated file\nexport type RoutePaths = ${routePaths};`;

  if (fs.existsSync(typeFilePath)) {
    fs.unlinkSync(typeFilePath);
  }

  if (
    !fs.existsSync(typeFilePath) ||
    fs.readFileSync(typeFilePath, "utf-8") !== content
  ) {
    fs.writeFileSync(typeFilePath, content);
    console.log("Route types updated in routes.ts");
  }
}

function crawlForRoutes() {
  const indexPath = path.resolve(__dirname, "src/index.ts");

  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, "utf-8");

    const routeBlocks = content.match(/registerRoute\((\{[\s\S]*?\})\)/g);

    if (routeBlocks) {
      console.log("Found routes in src/index.ts");

      routeBlocks.forEach((block) => {
        const parentPathMatch = block.match(/path:\s*["'`](.*?)["'`]/);
        const parentPath = parentPathMatch ? parentPathMatch[1] : "";

        if (parentPath && !registeredPaths.has(parentPath)) {
          registeredPaths.add(parentPath);
          console.log("Discovered route:", parentPath);
        }

        const childMatches = [...block.matchAll(/path:\s*["'`](.*?)["'`]/g)];
        childMatches.forEach((childMatch, index) => {
          if (index === 0) return;

          const childPath = childMatch[1];
          const fullPath = `${parentPath}${
            childPath.startsWith("/") ? childPath : `/${childPath}`
          }`.replaceAll("//", "/");

          if (!registeredPaths.has(fullPath)) {
            registeredPaths.add(fullPath);
            console.log("Discovered child route:", fullPath);
          }
        });
      });
    }
  } else {
    console.warn("src/index.ts not found.");
  }
}

function autoUpdateRoutesPlugin() {
  return {
    name: "auto-update-routes",
    buildStart() {
      if (process.env.NODE_ENV === "development") {
        crawlForRoutes();
        updateRouteTypes();
      }
    },
  };
}

export default defineConfig({
  root: "./",
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "src/index.html"),
      output: {
        dir: "dist",
      },
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
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [autoUpdateRoutesPlugin()],
});
