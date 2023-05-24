---
title: Introduction
description: Re-usable components built using Radix Svelte and Tailwind CSS.
---

<script>
  import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$components/ui/accordion';
</script>

This is **NOT** a component library. It's a collection of re-usable components that you can copy and paste into your apps.

**What do you mean not a component library?**

It means you do not install it as a dependency. It is not available or distributed via npm, with no plans to publish it.

Pick the components you need. Use the CLI to automatically add the components, or copy and paste the code into your project and customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

## FAQ

<Accordion type="multiple" collapsible>

<AccordionItem value="faq-1">
	<AccordionTrigger>
		Why copy/paste and not packaged as a dependency?
	</AccordionTrigger>
	<AccordionContent>
The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._

</AccordionContent>

</AccordionItem>

<AccordionItem value="faq-2">
<AccordionTrigger>
Which frameworks are supported?
</AccordionTrigger>
<AccordionContent>

This port is built to be used with Svelte/SvelteKit.

</AccordionContent>
</AccordionItem>

<AccordionItem value="faq-3">
	<AccordionTrigger>
	Can I use this in my project?
	</AccordionTrigger>
	<AccordionContent>
Yes. Free to use for personal and commercial projects. No attribution required.

But let us know if you do use it. We'd love to see what you build with it.

  </AccordionContent>

</AccordionItem>

</Accordion>

## Credits

- [@shadcn](https://twitter.com/shadcn) - The brilliant mind behind the designs, methodology, and implementation.
- [Radix Svelte](https://radix-svelte.com) - For the primitives.
- [Vercel](https://vercel.com) - Where I host all my projects.
- [Shu Ding](https://shud.in) - The typography style is adapted from his work on Nextra.
- [Cal](https://cal.com) - Where I copied the styles for the first component: the `Button`.
- [cmdk](https://cmdk.paco.me) - For the `<Command />` component.
