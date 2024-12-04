#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const readline = require("readline");

// Color functions
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
};

// Log helpers
const logSuccess = (message) => console.log(colors.green(message));
const logInfo = (message) => console.log(colors.cyan(message));
const logWarning = (message) => console.log(colors.yellow(message));
const logError = (message) => console.error(colors.red(message));

/**
 * Downloads a file from a given URL and saves it to a specified path.
 * @param {string} fileUrl - The URL of the file to download.
 * @param {string} outputPath - The local path to save the downloaded file.
 * @returns {Promise<void>}
 */
const downloadFile = (fileUrl, outputPath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    https
      .get(fileUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else {
          reject(
            new Error(
              `Failed to download file: ${response.statusCode} - ${fileUrl}`
            )
          );
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

// List of files to download
const files = [
  // Config files
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/vitest.config.ts",
    path: "vitest.config.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/vite.config.ts",
    path: "vite.config.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/tsconfig.json",
    path: "tsconfig.json",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/tailwind.config.mjs",
    path: "tailwind.config.mjs",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/README.md",
    path: "README.md",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/postcss.config.cjs",
    path: "postcss.config.cjs",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/package.json",
    path: "package.json",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/LICENSE",
    path: "LICENSE",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/.gitignore",
    path: ".gitignore",
  },
  // Source files
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/index.ts",
    path: "src/index.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/index.html",
    path: "src/index.html",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/index.css",
    path: "src/index.css",
  },
  // Pages
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/pages/App.tsx",
    path: "src/pages/App.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/pages/404.tsx",
    path: "src/pages/404.tsx",
  },
  // Components
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Accordion.tsx",
    path: "src/components/ui/Accordion.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Avatar.tsx",
    path: "src/components/ui/Avatar.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Badge.tsx",
    path: "src/components/ui/Badge.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Button.tsx",
    path: "src/components/ui/Button.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Card.tsx",
    path: "src/components/ui/Card.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Dropdown.tsx",
    path: "src/components/ui/Dropdown.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Link.tsx",
    path: "src/components/ui/Link.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Menu.tsx",
    path: "src/components/ui/Menu.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Modal.tsx",
    path: "src/components/ui/Modal.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Text.tsx",
    path: "src/components/ui/Text.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/ThemeController.tsx",
    path: "src/components/ui/ThemeController.tsx",
  },
  // Core lib files
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/clsx.ts",
    path: "src/core/clsx.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/jsx.ts",
    path: "src/core/jsx.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/logger.ts",
    path: "src/core/logger.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/router.ts",
    path: "src/core/router.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/state.ts",
    path: "src/core/state.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/utils.ts",
    path: "src/core/utils.ts",
  },
  // Type definitions
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/types/env.d.ts",
    path: "src/types/env.d.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/types/globals.d.ts",
    path: "src/types/globals.d.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/types/jsx.d.ts",
    path: "src/types/jsx.d.ts",
  },
  // Public files
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-36x36.png",
    path: "src/public/android-icon-36x36.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-48x48.png",
    path: "src/public/android-icon-48x48.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-72x72.png",
    path: "src/public/android-icon-72x72.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-96x96.png",
    path: "src/public/android-icon-96x96.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-144x144.png",
    path: "src/public/android-icon-144x144.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/android-icon-192x192.png",
    path: "src/public/android-icon-192x192.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-57x57.png",
    path: "src/public/apple-icon-57x57.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-60x60.png",
    path: "src/public/apple-icon-60x60.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-72x72.png",
    path: "src/public/apple-icon-72x72.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-76x76.png",
    path: "src/public/apple-icon-76x76.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-114x114.png",
    path: "src/public/apple-icon-114x114.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-120x120.png",
    path: "src/public/apple-icon-120x120.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-144x144.png",
    path: "src/public/apple-icon-144x144.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-152x152.png",
    path: "src/public/apple-icon-152x152.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-180x180.png",
    path: "src/public/apple-icon-180x180.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon-precomposed.png",
    path: "src/public/apple-icon-precomposed.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/apple-icon.png",
    path: "src/public/apple-icon.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/browserconfig.xml",
    path: "src/public/browserconfig.xml",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/favicon-16x16.png",
    path: "src/public/favicon-16x16.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/favicon-32x32.png",
    path: "src/public/favicon-32x32.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/favicon-96x96.png",
    path: "src/public/favicon-96x96.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/favicon.ico",
    path: "src/public/favicon.ico",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/icon.png",
    path: "src/public/icon.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/manifest.json",
    path: "src/public/manifest.json",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/ms-icon-70x70.png",
    path: "src/public/ms-icon-70x70.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/ms-icon-144x144.png",
    path: "src/public/ms-icon-144x144.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/ms-icon-150x150.png",
    path: "src/public/ms-icon-150x150.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/ms-icon-310x310.png",
    path: "src/public/ms-icon-310x310.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/robots.txt",
    path: "src/public/robots.txt",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/screenshot1.png",
    path: "src/public/screenshot1.png",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/public/screenshot2.png",
    path: "src/public/screenshot2.png",
  },
];

// Display ANSI art
const displayBanner = () => {
  console.log(
    colors.cyan(`

      ████████╗███████╗███████╗██╗    ██╗
      ╚══██╔══╝██╔════╝██╔════╝██║    ██║
         ██║   ███████╗█████╗  ██║ █╗ ██║
         ██║   ╚════██║██╔══╝  ██║███╗██║
         ██║   ███████║██║     ╚███╔███╔╝
         ╚═╝   ╚══════╝╚═╝      ╚══╝╚══╝ 
  `)
  );
  logInfo("              Welcome to TSFW setup!");
};

// Main script
displayBanner();

// Prompt the user for a directory name
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Rest of the script...
rl.question(
  colors.blue("\nEnter the name of the directory to create: "),
  (dirName) => {
    const targetDir = path.resolve(process.cwd(), dirName);

    // Create necessary directories
    try {
      fs.mkdirSync(path.join(targetDir, "src/core"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src/types"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src/public"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src/pages"), { recursive: true });
      fs.mkdirSync(path.join(targetDir, "src/components/ui"), {
        recursive: true,
      });
      logSuccess("Directories created successfully!");
    } catch (err) {
      logError(`Failed to create directories: ${err.message}`);
      rl.close();
      process.exit(1);
    }

    // Download files
    (async () => {
      try {
        await Promise.all(
          files.map((file) =>
            downloadFile(file.url, path.join(targetDir, file.path))
          )
        );
        logSuccess("All downloads completed successfully!");

        console.log("\n");

        // Prompt to install dependencies
        rl.question(
          colors.blue("Do you want to install dependencies? (y/n): "),
          (answer) => {
            if (answer.toLowerCase() === "y") {
              logInfo("Installing dependencies...");
              exec(`cd ${targetDir} && npm install`, (err, stdout, stderr) => {
                if (err) {
                  logError(`Error installing dependencies: ${err.message}`);
                } else {
                  console.log(stdout);
                  console.error(stderr);
                  logSuccess("Dependencies installed successfully!");
                  logInfo("\nNext steps:");
                  logInfo(`- ${colors.yellow(`cd ${dirName}`)}`);
                  logInfo(`- ${colors.yellow("npm run dev\n")}`);
                }
                rl.close();
              });
            } else {
              logWarning("Skipping dependency installation.");
              logInfo("\nNext steps:");
              logInfo(`- ${colors.yellow(`cd ${dirName}`)}`);
              logInfo(`- ${colors.yellow("npm install")}`);
              logInfo(`- ${colors.yellow("npm run dev\n")}`);
              rl.close();
            }
          }
        );
      } catch (err) {
        logError(`Error during download: ${err.message}`);
        rl.close();
        process.exit(1);
      }
    })();
  }
);
