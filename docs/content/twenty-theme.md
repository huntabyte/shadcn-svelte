---
title: Twenty theme
description: The Twenty CRM look on top of Ledger. One class, light and dark, tokens taken from twenty-ui.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="twenty-theme-demo">

<div></div>

</ComponentPreview>

The theme is a stylesheet, `twenty-theme.css`. It does nothing until an element has the class `theme-twenty` next to `style-ledger`.

## Source

Colors, radii, spacing, type sizes, the side panel width and the table geometry come from the [twenty-ui](https://github.com/twentyhq/twenty/tree/main/packages/twenty-ui/src/theme) theme files (`theme-light.css`, `theme-dark.css`), which are MIT licensed. Only tokens are copied. No Twenty component code is used. Where the browser supports display-p3, the exact twenty-ui values apply. Other browsers get sRGB values of the same colors.

## Installation

The theme sits on the Ledger tokens. Install them first. The CLI writes them into `:root` and `.dark` in your CSS, so they are never copied by hand. Run the same command again to pick up a token fix.

<PMAddComp name="ledger-tokens" />

Then the theme:

<PMAddComp name="twenty-theme" />

The CLI writes the file to `ui/twenty-theme.css` (a single file item has no folder). Import it once, after your Ledger styles:

```css
/* in src/app.css, after the Ledger styles; the path is relative to this file */
@import "./lib/components/ui/twenty-theme.css";
```

## Usage

Put both classes on `<html>`. Dialog, Popover, Select, Tooltip and Sheet portal to `body`, so on a wrapper element their content would stay on plain Ledger tokens.

```html
<html lang="en" class="style-ledger theme-twenty">
```

Dark mode works as before. Add `dark` to the same element or an ancestor.

## Buttons and badges

Buttons are 32 px with a small size of 24 px and a 4 px radius. Tags and status use the Badge `tone` prop (soft tint, readable ink). They never use the solid primary fill, which stays on buttons. The default badge is a soft blue chip and works for counts.

## What it sets

| Token | Value |
| --- | --- |
| `--radius` | 8px |
| `--ui-radius` | 4px |
| `--twenty-side-panel-width` | 500px |
| `--twenty-table-checkbox-column-width` | 32px |
| `--twenty-table-cell-padding-x` | 8px |
| `--twenty-table-row-height` | 32px |
| `--twenty-font-size-xs` to `-xl` | 11, 12, 13, 16, 20px |
| `--twenty-duration-fast`, `-normal` | 150ms, 300ms |

It also sets the standard variables (`--background`, `--foreground`, `--border`, `--primary`, `--sidebar` and the rest) from the twenty-ui gray scale and blue accent. The `--twenty-*` variables are plain CSS, so an app can read them for its own layout.
