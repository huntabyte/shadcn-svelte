---
title: August 2026 - Questionnaire
description: A new component for building multi-step question flows with fixed, freeform, multiple, and skippable answers.
date: 2026-08-05
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
</script>

Today, we're releasing [**Questionnaire**](/docs/components/questionnaire),
a new component for multi-step question flows. Use it for agent clarification
prompts, onboarding, surveys, intake forms, and configuration.

Questionnaire is available across all eight shadcn-svelte styles.

<ComponentPreview name="questionnaire-demo" align="end" class="[&_.preview>.preview]:min-h-[560px] [&_.preview>.preview]:p-4 sm:[&_.preview>.preview]:p-8">

<div></div>

</ComponentPreview>

## Features

- Single and multiple selection with native radios and checkboxes.
- Freeform answers alongside fixed choices.
- Explicit skipping for optional questions.
- Previous, next, submit, and custom progress controls.
- Required and custom validation.
- Controlled navigation, saved defaults, and conditional questions.
- Keyboard navigation with optional letter or number shortcuts.
- Native form serialization and server-rendered collection state.
- Standalone, Card, and Dialog composition.

## Installation

```bash
pnpm dlx shadcn-svelte@latest add questionnaire
```

## @shadcn-svelte/primitives

The `<Questionnaire />` component is also available as an unstyled headless primitive in `@shadcn-svelte/primitives`. [Read the docs](/docs/components/questionnaire#unstyled) to learn more.

<div class="flex flex-wrap gap-2">
	<Button size="sm" href="/docs/components/questionnaire" class="mt-6 no-underline!">
		View Questionnaire
	</Button>
</div>
