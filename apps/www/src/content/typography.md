---
title: Typography
description: Styles for headings, paragraphs, lists...etc
component: true
---

<script>
  import {  ComponentExample } from "$components/docs"
  import { TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyInlineCode, TypographyLarge, TypographyLead, TypographyList, TypographyMuted, TypographyP, TypographySmall, TypographyTable, TypographyDemo } from '@/registry/default/example'
</script>

<ComponentExample
src="src/lib/registry/default/example/typography/typography-demo.svelte">

<div slot="example" class="[&>div.min-h-[350px]]:p-6">
<TypographyDemo />
</div>

</ComponentExample>

## h1

<ComponentExample src="src/lib/registry/default/example/typography/typography-h1.svelte" >

<div slot="example">
  <TypographyH1 />
</div>

</ComponentExample>

## h2

<ComponentExample src="src/lib/registry/default/example/typography/typography-h2.svelte">

<div slot="example">
  <TypographyH2 />
</div>

</ComponentExample>

## h3

<ComponentExample src="src/lib/registry/default/example/typography/typography-h3.svelte" >

<div slot="example">
  <TypographyH3 />
</div>

</ComponentExample>

## h4

<ComponentExample src="src/lib/registry/default/example/typography/typography-h4.svelte" >

<div slot="example">
  <TypographyH4 />
</div>

</ComponentExample>

## p

<ComponentExample src="src/lib/registry/default/example/typography/typography-p.svelte">

<div slot="example">
  <TypographyP />
</div>

</ComponentExample>

## blockquote

<ComponentExample src="src/lib/registry/default/example/typography/typography-blockquote.svelte">

<div slot="example">
<TypographyBlockquote />
</div>

</ComponentExample>

## table

<ComponentExample src="src/lib/registry/default/example/typography/typography-table.svelte">

<div slot="example">
  <TypographyTable />
</div>

</ComponentExample>

## list

<ComponentExample src="src/lib/registry/default/example/typography/typography-list.svelte">

<div slot="example">
  <TypographyList />
</div>

</ComponentExample>

## Inline code

<ComponentExample
src="src/lib/registry/default/example/typography/typography-inline-code.svelte">

<div slot="example">
  <TypographyInlineCode />
</div>

</ComponentExample>

## Lead

<ComponentExample src="src/lib/registry/default/example/typography/typography-lead.svelte">

<div slot="example">
  <TypographyLead />
</div>

</ComponentExample>

## Large

<ComponentExample src="src/lib/registry/default/example/typography/typography-large.svelte">

<div slot="example">
  <TypographyLarge />
</div>

</ComponentExample>

## Small

<ComponentExample
src="src/lib/registry/default/example/typography/typography-small.svelte">

<div slot="example">
  <TypographySmall />
</div>

</ComponentExample>

## Muted

<ComponentExample src="src/lib/registry/default/example/typography/typography-muted.svelte">

<div slot="example">
  <TypographyMuted />
</div>

</ComponentExample>
