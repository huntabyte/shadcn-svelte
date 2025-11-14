export const BASE_STYLES = `@import "tailwindcss";

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
`;

export const BASE_STYLES_WITH_VARIABLES = `@import "tailwindcss";

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: <%- colors.light["background"] %>;
  --foreground: <%- colors.light["foreground"] %>;
  --card: <%- colors.light["card"] %>;
  --card-foreground: <%- colors.light["card-foreground"] %>;
  --popover: <%- colors.light["popover"] %>;
  --popover-foreground: <%- colors.light["popover-foreground"] %>;
  --primary: <%- colors.light["primary"] %>;
  --primary-foreground: <%- colors.light["primary-foreground"] %>;
  --secondary: <%- colors.light["secondary"] %>;
  --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
  --muted: <%- colors.light["muted"] %>;
  --muted-foreground: <%- colors.light["muted-foreground"] %>;
  --accent: <%- colors.light["accent"] %>;
  --accent-foreground: <%- colors.light["accent-foreground"] %>;
  --destructive: <%- colors.light["destructive"] %>;
  --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
  --border: <%- colors.light["border"] %>;
  --input: <%- colors.light["input"] %>;
  --ring: <%- colors.light["ring"] %>;
  --chart-1: <%- colors.light["chart-1"] %>;
  --chart-2: <%- colors.light["chart-2"] %>;
  --chart-3: <%- colors.light["chart-3"] %>;
  --chart-4: <%- colors.light["chart-4"] %>;
  --chart-5: <%- colors.light["chart-5"] %>;
  --sidebar: <%- colors.light["sidebar"] %>;
  --sidebar-foreground: <%- colors.light["sidebar-foreground"] %>;
  --sidebar-primary: <%- colors.light["sidebar-primary"] %>;
  --sidebar-primary-foreground: <%- colors.light["sidebar-primary-foreground"] %>;
  --sidebar-accent: <%- colors.light["sidebar-accent"] %>;
  --sidebar-accent-foreground: <%- colors.light["sidebar-accent-foreground"] %>;
  --sidebar-border: <%- colors.light["sidebar-border"] %>;
  --sidebar-ring: <%- colors.light["sidebar-ring"] %>;
}

.dark {
  --background: <%- colors.dark["background"] %>;
  --foreground: <%- colors.dark["foreground"] %>;
  --card: <%- colors.dark["card"] %>;
  --card-foreground: <%- colors.dark["card-foreground"] %>;
  --popover: <%- colors.dark["popover"] %>;
  --popover-foreground: <%- colors.dark["popover-foreground"] %>;
  --primary: <%- colors.dark["primary"] %>;
  --primary-foreground: <%- colors.dark["primary-foreground"] %>;
  --secondary: <%- colors.dark["secondary"] %>;
  --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
  --muted: <%- colors.dark["muted"] %>;
  --muted-foreground: <%- colors.dark["muted-foreground"] %>;
  --accent: <%- colors.dark["accent"] %>;
  --accent-foreground: <%- colors.dark["accent-foreground"] %>;
  --destructive: <%- colors.dark["destructive"] %>;
  --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
  --border: <%- colors.dark["border"] %>;
  --input: <%- colors.dark["input"] %>;
  --ring: <%- colors.dark["ring"] %>;
  --chart-1: <%- colors.dark["chart-1"] %>;
  --chart-2: <%- colors.dark["chart-2"] %>;
  --chart-3: <%- colors.dark["chart-3"] %>;
  --chart-4: <%- colors.dark["chart-4"] %>;
  --chart-5: <%- colors.dark["chart-5"] %>;
  --sidebar: <%- colors.dark["sidebar"] %>;
  --sidebar-foreground: <%- colors.dark["sidebar-foreground"] %>;
  --sidebar-primary: <%- colors.dark["sidebar-primary"] %>;
  --sidebar-primary-foreground: <%- colors.dark["sidebar-primary-foreground"] %>;
  --sidebar-accent: <%- colors.dark["sidebar-accent"] %>;
  --sidebar-accent-foreground: <%- colors.dark["sidebar-accent-foreground"] %>;
  --sidebar-border: <%- colors.dark["sidebar-border"] %>;
  --sidebar-ring: <%- colors.dark["sidebar-ring"] %>;
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

export const THEME_STYLES_WITH_VARIABLES = `.theme-<%- theme %> {
  --radius: 0.5rem;
  --background: <%- colors.light["background"] %>;
  --foreground: <%- colors.light["foreground"] %>;
  --muted: <%- colors.light["muted"] %>;
  --muted-foreground: <%- colors.light["muted-foreground"] %>;
  --popover: <%- colors.light["popover"] %>;
  --popover-foreground: <%- colors.light["popover-foreground"] %>;
  --card: <%- colors.light["card"] %>;
  --card-foreground: <%- colors.light["card-foreground"] %>;
  --border: <%- colors.light["border"] %>;
  --input: <%- colors.light["input"] %>;
  --primary: <%- colors.light["primary"] %>;
  --primary-foreground: <%- colors.light["primary-foreground"] %>;
  --secondary: <%- colors.light["secondary"] %>;
  --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
  --accent: <%- colors.light["accent"] %>;
  --accent-foreground: <%- colors.light["accent-foreground"] %>;
  --destructive: <%- colors.light["destructive"] %>;
  --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
  --ring: <%- colors.light["ring"] %>;
  --chart-1: <%- colors.light["chart-1"] %>;
  --chart-2: <%- colors.light["chart-2"] %>;
  --chart-3: <%- colors.light["chart-3"] %>;
  --chart-4: <%- colors.light["chart-4"] %>;
  --chart-5: <%- colors.light["chart-5"] %>;
  --sidebar: <%- colors.light["sidebar"] %>;
  --sidebar-foreground: <%- colors.light["sidebar-foreground"] %>;
  --sidebar-primary: <%- colors.light["sidebar-primary"] %>;
  --sidebar-primary-foreground: <%- colors.light["sidebar-primary-foreground"] %>;
  --sidebar-accent: <%- colors.light["sidebar-accent"] %>;
  --sidebar-accent-foreground: <%- colors.light["sidebar-accent-foreground"] %>;
  --sidebar-border: <%- colors.light["sidebar-border"] %>;
  --sidebar-ring: <%- colors.light["sidebar-ring"] %>;
}

.dark .theme-<%- theme %> {
  --background: <%- colors.dark["background"] %>;
  --foreground: <%- colors.dark["foreground"] %>;
  --muted: <%- colors.dark["muted"] %>;
  --muted-foreground: <%- colors.dark["muted-foreground"] %>;
  --popover: <%- colors.dark["popover"] %>;
  --popover-foreground: <%- colors.dark["popover-foreground"] %>;
  --card: <%- colors.dark["card"] %>;
  --card-foreground: <%- colors.dark["card-foreground"] %>;
  --border: <%- colors.dark["border"] %>;
  --input: <%- colors.dark["input"] %>;
  --primary: <%- colors.dark["primary"] %>;
  --primary-foreground: <%- colors.dark["primary-foreground"] %>;
  --secondary: <%- colors.dark["secondary"] %>;
  --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
  --accent: <%- colors.dark["accent"] %>;
  --accent-foreground: <%- colors.dark["accent-foreground"] %>;
  --destructive: <%- colors.dark["destructive"] %>;
  --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
  --ring: <%- colors.dark["ring"] %>;
  --chart-1: <%- colors.dark["chart-1"] %>;
  --chart-2: <%- colors.dark["chart-2"] %>;
  --chart-3: <%- colors.dark["chart-3"] %>;
  --chart-4: <%- colors.dark["chart-4"] %>;
  --chart-5: <%- colors.dark["chart-5"] %>;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: <%- colors.dark["sidebar-foreground"] %>;
  --sidebar-primary: <%- colors.dark["sidebar-primary"] %>;
  --sidebar-primary-foreground: <%- colors.dark["sidebar-primary-foreground"] %>;
  --sidebar-accent: <%- colors.dark["sidebar-accent"] %>;
  --sidebar-accent-foreground: <%- colors.dark["sidebar-accent-foreground"] %>;
  --sidebar-border: <%- colors.dark["sidebar-border"] %>;
  --sidebar-ring: <%- colors.dark["sidebar-ring"] %>;
}`;
