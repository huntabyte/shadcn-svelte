---
title: February 2024 - New Component Resizable
description: New Component Resizable in shadcn-svelte.
url: /docs/changelog/2024-02-resizable
---

## February 2024

### New Component: Resizable

We've added a new component to the project, [Resizable](/docs/components/resizable), which is built on top of [PaneForge](https://paneforge.com). PaneForge is still in an early stage, so be sure to raise any issues you find with the library on the [PaneForge GitHub](https://github.com/svecosystem/paneforge).

### Updated Icon Imports

After some feedback about dev server performance, we've updated the way we import icons. With this change, we've decided to move away from the unmaintained `radix-icons-svelte` package to [svelte-radix](https://github.com/shinokada/svelte-radix) for the `new-york` style.

Instead of importing icons like so:

```ts
import { Check } from "@lucide/svelte";
```

We now import them directly:

```ts
import Check from "@lucide/svelte/icons/check";
```

With deep imports, we're preventing Vite from optimizing the entire icon collections, and instead only optimizing the icons that are actually used in your project. From what we've seen, this has a massive impact on dev server performance. Enjoy! 🚀

### Major Forms Update

Formsnap has been completely rewritten to be more flexible, easier to use, and less opinionated. This means we've had to make some changes to the way we use it in `shadcn-svelte`, but once you get the hang of it, you'll find it's much more powerful and less restrictive than the previous iteration.

Since the changes are so significant, there isn't a direct migration path from the old version to the new version. You'll need to update your components to use the new API, as well as ensure you're using the latest version of `formsnap` and `sveltekit-superforms`.

All of the `Form` components have been updated to use the new API, and you can see live examples of them on the [Forms Examples](/examples/forms) page.

Visit the [Formsnap](https://formsnap.dev) documentation (which has also been updated) to learn more about the new API and how its used.
