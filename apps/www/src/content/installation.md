---
title: Installation
description: How to install dependencies and structure your app.
---

<script>
  import { Alert, AlertDescription } from "$components/ui/alert";
  import { Steps } from "$components/docs";
</script>

<Alert style="padding-left: 1rem;">
  <AlertDescription>

    **Prerequisites**: Components are styled using [Tailwind
    CSS](https://tailwindcss.com). You need to install Tailwind CSS in your
    project. Follow the [Tailwind CSS installation instructions](https://tailwindcss.com/docs/installation) or use the `svelte-add` CLI to add Tailwind CSS to your project.

```bash
npx svelte-add@latest tailwindcss
```

  </AlertDescription>
</Alert>

## New Project

<Steps>

### Create a new project

Use the SvelteKit CLI to create a new project.

```bash
npm create svelte@latest my-app
```

### Add TailwindCSS

Use the `svelte-add` CLI to add Tailwind CSS to your project.

```bash
npx svelte-add@latest tailwindcss
```

### Run the CLI

```bash
npx shadcn-svelte init
```

This will install dependencies, update your TailwindCSS configuration, and configure the `cn` utils for you.

</Steps>

## Manual Installation

<Steps>

### Add TailwindCSS

Use the `svelte-add` CLI to add Tailwind CSS to your project.

```bash
npx svelte-add@latest tailwindcss
```

### Add dependencies

Add the following dependencies to your project:

```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-svelte
```

### Path Aliases

Use the `$` alias to make it easier to import your components. This is how you can configure the `$` alias in `svelte.config.js`:

```js title="svelte.config.js" {7-8}
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // ...
  kit: {
    // ..
    alias: {
      $components: "src/lib/components",
      "$components/*": "src/lib/components/*"
    }
  }
};
```

If you prefer to use a different alias than `$`, you'll need to update the `import` statements when adding components.

### Configure tailwind.config.js

This is what this project's `tailwind.config.cjs` file looks like:

```js title="tailwind.config.cjs"
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
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
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: [...fontFamily.sans]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
```

Feel free to add or modify as needed to suit your project.

### Configure styles

Add the following to your `src/app.postcss` file. You can learn more about using CSS variables for theming in the [theming section](/docs/theming).

```css title="src/app.postcss"
@tailwind base;
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
}
```

### Add a cn helper

You'll want to create a `cn` helper to make it easier to conditionally add Tailwind CSS classes. This project defines it in `lib/utils.ts`:

```ts title="lib/utils.ts"
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Import styles to your app

Create `src/+layout.svelte` and import the styles:

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
  import "../app.postcss";
</script>

<slot />
```

</Steps>

## Icons

This project uses icons from [Lucide](https://lucide.dev/), but feel free to use any icon library.

## App structure

Here's a recommended, but not required app structure:

```txt {4-11,15,19}
src
├── lib
│   ├── components
│   │   ├── ui
│   │   │   ├── alert-dialog
│   │   │   │   ├── index.ts
│   │   │   │   └── Alert.svelte
│   │   │   ├── button
│   │   │   │   ├── index.ts
│   │   │   │   └── Button.svelte
│   │   │   └── ...
│   │   ├── Navigation.svelte
│   │   ├── PageHeader.svelte
│   │   └── ...
│   └── utils.ts
├── routes
│   ├── +page.svelte
│   └── +layout.svelte
├── app.postcss
```

- Place the UI components in the `lib/components/ui` folder.
- The rest of the components such as `<PageHeader />` and `<Navigation />` are placed in the `lib/components` folder.
- The `lib/utils.ts` file is where you can define the `cn` helper.
- The `app.postcss` file contains the global CSS.

That's it. You can now start adding components to your project.
