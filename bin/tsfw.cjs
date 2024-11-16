#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const readline = require("readline");

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
  // Pages and components
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/pages/App.tsx",
    path: "src/pages/App.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/template/src/pages/404.tsx",
    path: "src/pages/404.tsx",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/components/ui/Text.tsx",
    path: "src/components/ui/Text.tsx",
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
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/router.ts",
    path: "src/core/router.ts",
  },
  {
    url: "https://raw.githubusercontent.com/Cotter45/TSFW/main/src/core/state.ts",
    path: "src/core/state.ts",
  },
];

// Prompt the user for a directory name
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the name of the directory to create: ", (dirName) => {
  const targetDir = path.resolve(process.cwd(), dirName);

  // Create necessary directories
  try {
    fs.mkdirSync(path.join(targetDir, "src/core"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src/pages"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src/components/ui"), {
      recursive: true,
    });
  } catch (err) {
    console.error(`Failed to create directories: ${err.message}`);
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
      console.log(`All downloads completed successfully in ${dirName}!`);

      // Prompt to install dependencies
      rl.question("Do you want to install dependencies? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y") {
          console.log("Installing dependencies...");
          exec(`cd ${targetDir} && npm install`, (err, stdout, stderr) => {
            if (err) {
              console.error(`Error installing dependencies: ${err.message}`);
            } else {
              console.log(stdout);
              console.error(stderr);
              console.log("Dependencies installed successfully!");
            }
            rl.close();
          });
        } else {
          console.log("Skipping dependency installation.");
          rl.close();
        }
      });
    } catch (err) {
      console.error(`Error during download: ${err.message}`);
      rl.close();
      process.exit(1);
    }
  })();
});
