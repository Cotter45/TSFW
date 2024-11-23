import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import legacy from "@vitejs/plugin-legacy";

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
  }
}

function crawlForRoutes() {
  const indexPath = path.resolve(__dirname, "src/index.ts");

  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, "utf-8");

    const routeBlocks = content.match(/registerRoutes\((\{[\s\S]*?\})\)/g);

    if (routeBlocks) {
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
    configureServer(server) {
      server.watcher.on("change", (file) => {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          crawlForRoutes();
          updateRouteTypes();
        }
      });
    },
  };
}

export default defineConfig({
  root: "./src",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, "dist"),
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  esbuild: {
    target: "es2022",
    supported: {
      "top-level-await": true,
    },
  },
  plugins: [
    autoUpdateRoutesPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    VitePWA({
      scope: "/",
      base: "/",
      registerType: "autoUpdate",
      injectRegister: "script-defer",
      manifestFilename: "manifest.json",
      workbox: {
        globPatterns: ["**/*.{ico,png,svg,json}"],
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: "TSFW",
        short_name: "tsfw",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/android-icon-36x36.png",
            sizes: "36x36",
            type: "image/png",
          },
          {
            src: "/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot1.png",
            sizes: "1280x1200",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshot2.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
