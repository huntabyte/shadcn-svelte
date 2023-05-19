---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
radix:
  link: https://www.radix-svelte.com/docs/accordion
  api: https://www.radix-svelte.com/docs/accordion
---

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {5-18} /module/
/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out"
			}
		}
	}
};
```
