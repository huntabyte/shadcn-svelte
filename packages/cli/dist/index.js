#!/usr/bin/env node

// src/utils/get-components.ts
import fetch from "node-fetch";
import * as z from "zod";
var baseUrl = process.env.COMPONENTS_BASE_URL ?? "http://localhost:5173";
var componentSchema = z.object({
  component: z.string(),
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      name: z.string(),
      dir: z.string(),
      content: z.string()
    })
  )
});
var componentsSchema = z.array(componentSchema);
async function getAvailableComponents() {
  try {
    const response = await fetch(`${baseUrl}/api/components`);
    const components = await response.json();
    return componentsSchema.parse(components);
  } catch (error) {
    throw new Error(
      `Failed to fetch components from ${baseUrl}/api/components.`
    );
  }
}

// src/utils/get-package-info.ts
import fs from "fs-extra";
import path from "path";
function getPackageInfo() {
  const packageJsonPath = path.join("package.json");
  return fs.readJSONSync(packageJsonPath);
}

// src/utils/get-package-manager.ts
function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return "npm";
  }
  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }
  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }
  return "npm";
}

// src/utils/get-project-info.ts
import { existsSync } from "fs";
import fs2 from "fs-extra";
import path2 from "path";
async function getProjectInfo() {
  const info = {
    tsconfig: null,
    alias: null,
    srcDir: false,
    appDir: false
  };
  try {
    const tsconfig = await getTsConfig();
    const paths = tsconfig?.compilerOptions?.paths;
    const alias = paths ? Object.keys(paths)[0].replace("*", "") : null;
    return {
      tsconfig,
      alias,
      srcDir: existsSync(path2.resolve("./src")),
      appDir: existsSync(path2.resolve("./app")) || existsSync(path2.resolve("./src/app"))
    };
  } catch (error) {
    return info;
  }
}
async function getTsConfig() {
  try {
    const tsconfigPath = path2.join("tsconfig.json");
    const tsconfig = await fs2.readJSON(tsconfigPath);
    if (!tsconfig) {
      throw new Error("tsconfig.json is missing");
    }
    return tsconfig;
  } catch (error) {
    return null;
  }
}

// src/utils/logger.ts
import chalk from "chalk";
var logger = {
  error(...args) {
    console.log(chalk.red(...args));
  },
  warn(...args) {
    console.log(chalk.yellow(...args));
  },
  info(...args) {
    console.log(chalk.cyan(...args));
  },
  success(...args) {
    console.log(chalk.green(...args));
  }
};

// src/utils/templates.ts
var STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 215 20.2% 65.1%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
 
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
 
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
 
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
 
    --border: 216 34% 17%;
    --input: 216 34% 17%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
 
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
 
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 216 34% 17%;
 
    --radius: 0.5rem;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`;
var UTILS = `import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
var TAILWIND_CONFIG = `const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [...fontFamily.sans]
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}`;

// src/index.ts
import { Command } from "commander";
import { execa } from "execa";
import { existsSync as existsSync2, promises as fs3 } from "fs";
import ora from "ora";
import path3 from "path";
import prompts from "prompts";
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
var PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-svelte"
];
async function main() {
  const packageInfo = getPackageInfo();
  const projectInfo = await getProjectInfo();
  const packageManager = getPackageManager();
  const program = new Command().name("shadcn-svelte").description("Add shadcn-svelte components to your project").version(
    packageInfo.version || "1.0.0",
    "-v, --version",
    "display the version number"
  );
  program.command("init").description("Configure your SvelteKit project.").option("-y, --yes", "Skip confirmation prompt.").action(async (options) => {
    logger.warn(
      "This command assumes a SvelteKit project with TypeScript and Tailwind CSS."
    );
    logger.warn(
      "If you don't have these, follow the manual steps at https://ui.shadcn.com/docs/installation."
    );
    logger.warn("");
    if (!options.yes) {
      const { proceed } = await prompts({
        type: "confirm",
        name: "proceed",
        message: "Running this command will install dependencies and overwrite your existing tailwind.config.cjs. Proceed?",
        initial: true
      });
      if (!proceed) {
        process.exit(0);
      }
    }
    const dependenciesSpinner = ora(`Installing dependencies...`).start();
    await execa(packageManager, [
      packageManager === "npm" ? "install" : "add",
      ...PROJECT_DEPENDENCIES
    ]);
    dependenciesSpinner.succeed();
    if (!projectInfo?.appDir) {
      const stylesDir = "./src/styles";
      if (!existsSync2(path3.resolve(stylesDir))) {
        await fs3.mkdir(path3.resolve(stylesDir), { recursive: true });
      }
    }
    let stylesDestination = "./src/styles/globals.css";
    if (projectInfo?.appDir) {
      stylesDestination = "./src/app/globals.css";
    }
    const stylesSpinner = ora(`Adding styles with CSS variables...`).start();
    await fs3.writeFile(stylesDestination, STYLES, "utf8");
    stylesSpinner.succeed();
    const libDir = "./src/lib";
    if (!existsSync2(path3.resolve(libDir))) {
      await fs3.mkdir(path3.resolve(libDir), { recursive: true });
    }
    const utilsDestination = "./src/lib/utils.ts";
    const utilsSpinner = ora(`Adding utils...`).start();
    await fs3.writeFile(utilsDestination, UTILS, "utf8");
    utilsSpinner.succeed();
    const tailwindDestination = "./tailwind.config.cjs";
    const tailwindSpinner = ora(`Updating tailwind.config.cjs...`).start();
    await fs3.writeFile(tailwindDestination, TAILWIND_CONFIG, "utf8");
    tailwindSpinner.succeed();
  });
  program.command("add").description("add components to your project").argument("[components...]", "name of components").action(async (components) => {
    logger.warn(
      "Running the following command will overwrite existing files."
    );
    logger.warn(
      "Make sure you have committed your changes before proceeding."
    );
    logger.warn("");
    const availableComponents = await getAvailableComponents();
    if (!availableComponents?.length) {
      logger.error(
        "An error occurred while fetching components. Please try again."
      );
      process.exit(0);
    }
    let selectedComponents = availableComponents.filter(
      (component) => components.includes(component.component)
    );
    if (!selectedComponents?.length) {
      selectedComponents = await promptForComponents(availableComponents);
    }
    const dir = await promptForDestinationDir();
    if (!selectedComponents?.length) {
      logger.warn("No components selected. Nothing to install.");
      process.exit(0);
    }
    const destinationDir = path3.resolve(dir);
    if (!existsSync2(destinationDir)) {
      const spinner = ora(`Creating ${dir}...`).start();
      await fs3.mkdir(destinationDir, { recursive: true });
      spinner.succeed();
    }
    logger.success(
      `Installing ${selectedComponents.length} component(s) and dependencies...`
    );
    for (const component of selectedComponents) {
      const componentSpinner = ora(`${component.name}...`).start();
      for (const file of component.files) {
        if (projectInfo?.alias) {
          file.content = file.content.replace(/$\//g, projectInfo.alias);
        }
        const filePath = path3.resolve(dir, file.name);
        await fs3.writeFile(filePath, file.content);
      }
      if (component.dependencies?.length) {
        await execa(packageManager, [
          packageManager === "npm" ? "install" : "add",
          ...component.dependencies
        ]);
      }
      componentSpinner.succeed(component.name);
    }
  });
  program.parse();
}
async function promptForComponents(components) {
  const { components: selectedComponents } = await prompts({
    type: "autocompleteMultiselect",
    name: "components",
    message: "Which component(s) would you like to add?",
    hint: "Space to select. A to select all. I to invert selection.",
    instructions: false,
    choices: components.map((component) => ({
      title: component.name,
      value: component
    }))
  });
  return selectedComponents;
}
async function promptForDestinationDir() {
  const { dir } = await prompts([
    {
      type: "text",
      name: "dir",
      message: "Where would you like to install the component(s)?",
      initial: "./src/lib/components/ui"
    }
  ]);
  return dir;
}
main();
//# sourceMappingURL=index.js.map