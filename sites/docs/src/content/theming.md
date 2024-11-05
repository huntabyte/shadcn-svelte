---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

<script>
  import { Callout, Steps } from '$lib/components/docs';
  import HexToChannels from "$lib/components/docs/hex-to-channels.svelte";
</script>

We use CSS variables for styling. This allows you to easily change the colors of components without having to update class names.

**CSS variables must be defined without the color space function**. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information.

## Hex -> Color Channel

You can use this tool to convert your HEX color to HSL without the color space function. Simply add your color in hex format, copy one of the generated values, then add them to the CSS variable.

<HexToChannels />

## Convention

We use a simple `background` and `foreground` convention for colors. The `background` variable is used for the background color of the component and the `foreground` variable is used for the text color.

<Callout>

The `background` suffix can be omitted if the variable is used for the background color of the component.

</Callout>

Given the following CSS variables:

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

The `background` color of the following component will be `hsl(var(--primary) / <alpha-value>)` and the `foreground` color will be `hsl(var(--primary-foreground) / <alpha-value>)`.

```svelte
<div class="bg-primary text-primary-foreground">Hello</div>
```

<Callout>

**CSS variables must be defined without color space function**. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information.

</Callout>

## List of variables

Here's the list of variables available for customization:

<Steps>

```css title="Default background color of <body />...etc"
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

```css title="Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch />"
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

```css title="Background color for <Card />"
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

```css title="Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover />"
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

```css title="Default border color"
--border: 214.3 31.8% 91.4%;
```

```css title="Border color for inputs such as <Input />, <Select />, <Textarea />"
--input: 214.3 31.8% 91.4%;
```

```css title="Primary colors for <Button />"
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

```css title="Secondary colors for <Button />"
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

```css title="Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc"
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

```css title="Used for destructive actions such as <Button variant='destructive'>"
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

```css title="Used for focus ring"
--ring: 215 20.2% 65.1%;
```

```css title="Border radius for card, input and buttons"
--radius: 0.5rem;
```

</Steps>

### Adding new colors

To add new colors, you need to add them to your CSS file and to your `tailwind.config.js` file.

```css title="src/app.css"
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

```js {5-6} title="tailwind.config.js"
export default {
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
      },
    },
  },
};
```

You can now use the `warning` utility class in your components.

```svelte /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground"></div>
```

### Other color formats

It's recommended to use [HSL colors](https://www.smashingmagazine.com/2021/07/hsl-colors-css/) for theming but you can also use other color formats if you prefer.

See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information on using `rgb`, `rgba` or `hsl` colors.

## Integrating with other theming libraries

### Daisy UI

To use Shadcn components with daisy ui you just need to change the variables in the tailwind config to match daisyui ones, note that daisy ui uses _oklch_

You should be able to delete the entire postcss file and just change the variables in your tailwind config

#### Usefull Links

- [Theme Default Variables](https://github.com/saadeghi/daisyui/blob/master/src/theming/themeDefaults.js)
- [Color Variables](https://github.com/saadeghi/daisyui/blob/master/src/theming/colorNames.js)
- [Official Docs](https://daisyui.com/)

- [Check the Demo](https://shad-daisy.vercel.app/)

Example

```js title="tailwind.config.js"
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {
			colors: {
				border: 'oklch(var(--p) / <alpha-value>)',
				input: 'oklch(var(--s) / <alpha-value>)',
				ring: 'oklch(var(--in) / <alpha-value>)',
				background: 'oklch(var(--b1) / <alpha-value>)',
				foreground: 'oklch(var(--bc) / <alpha-value>)',
				primary: {
					DEFAULT: 'oklch(var(--p) / <alpha-value>)',
					foreground: 'oklch(var(--pc) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'oklch(var(--s) / <alpha-value>)',
					foreground: 'oklch(var(--sc) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'oklch(var(--er) / <alpha-value>)',
					foreground: 'oklch(var(--erc) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'oklch(var(--n) / <alpha-value>)',
					foreground: 'oklch(var(--nc) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'oklch(var(--a) / <alpha-value>)',
					foreground: 'oklch(var(--ac) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'oklch(var(--b2) / <alpha-value>)',
					foreground: 'oklch(var(--bc) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'oklch(var(--n) / <alpha-value>)',
					foreground: 'oklch(var(--nc) / <alpha-value>)'
				},
				sidebar: {
					DEFAULT: 'oklch(var(--b2) / <alpha-value>)',
					foreground: 'oklch(var(--bc) / <alpha-value>)',
					primary: 'oklch(var(--p) / <alpha-value>)',
					'primary-foreground': 'oklch(var(--pc) / <alpha-value>)',
					accent: 'oklch(var(--p) / <alpha-value>)',
					'accent-foreground': 'oklch(var(--pc) / <alpha-value>)',
					border: 'oklch(var(--bc) / <alpha-value>)',
					ring: 'oklch(var(--bc) / <alpha-value>)'
				}
			},
			borderRadius: {
				xl: 'calc(var(--rounded-btn) + 4px)',
				lg: 'var(--rounded-btn)',
				md: 'calc(var(--rounded-btn) - 2px)',
				sm: 'calc(var(--rounded-btn) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			}
		}
	},

	plugins: [daisyui, tailwindcssAnimate],
	daisyui: {
		themes: [
			'bumblebee',
			'light',
			'dark',
			'cupcake',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
			'dim',
			'nord',
			'sunset'
		]
	}
} satisfies Config;

```
