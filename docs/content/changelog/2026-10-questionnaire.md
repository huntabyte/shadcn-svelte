---
title: October 2026 - Questionnaire
description: A new component for building multi-step question flows with fixed, freeform, multiple, and skippable answers.
date: 2026-10-05
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
  import Button from "$lib/registry/ui/button/button.svelte";
</script>

Today, we're releasing [**Questionnaire**](/docs/components/questionnaire),
a new component for multi-step question flows. Use it for agent clarification
prompts, onboarding, surveys, intake forms, and configuration.

Questionnaire is available for Svelte across all eight styles.

<ComponentPreview name="questionnaire-demo" align="start" previewClassName="min-h-[560px] p-4 sm:p-8">

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

<PMAddComp name="questionnaire" />

## @shadcn-svelte/primitives

Questionnaire is also available as an unstyled headless primitive in `@shadcn-svelte/primitives/questionnaire`. [Read the docs](/docs/components/questionnaire#unstyled) to learn more.

<Button size="sm" href="/docs/components/questionnaire" class="mt-6 no-underline!">
  View Questionnaire
</Button>
