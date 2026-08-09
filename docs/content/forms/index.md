---
title: Forms
description: Build accessible Svelte forms with Formsnap, Formisch, or TanStack Form.
---

<script>
	import LinkedCard from "$lib/components/linked-card.svelte";
</script>

Choose the form library that best matches your application. Each guide uses the same composable [Field](/docs/components/field) primitives and native Svelte controls.

<div class="grid gap-4 md:grid-cols-3">
  <LinkedCard href="/docs/forms/formsnap">
    <span class="font-semibold">Formsnap</span>
    <span class="text-muted-foreground text-sm">SvelteKit forms with Superforms and schema validation.</span>
  </LinkedCard>
  <LinkedCard href="/docs/forms/formisch">
    <span class="font-semibold">Formisch</span>
    <span class="text-muted-foreground text-sm">Schema-first, type-safe client forms powered by Valibot.</span>
  </LinkedCard>
  <LinkedCard href="/docs/forms/tanstack-form">
    <span class="font-semibold">TanStack Form</span>
    <span class="text-muted-foreground text-sm">Headless, framework-native form state with Standard Schema validation.</span>
  </LinkedCard>
</div>
