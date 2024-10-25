<script lang="ts">
	import Announcement from "$lib/components/docs/announcement.svelte";
	import ExamplesNav from "$lib/components/docs/examples-nav/examples-nav.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";

	let { children } = $props();
</script>

<div class="container relative pb-10">
	<PageHeader.Root>
		<Announcement />
		<PageHeader.Heading class="hidden md:block">Check out some examples</PageHeader.Heading>
		<PageHeader.Heading class="md:hidden">Examples</PageHeader.Heading>
		<PageHeader.Description>
			Dashboard, cards, authentication. Some examples built using the components. Use this as
			a guide to build your own.
		</PageHeader.Description>
		<PageHeader.Actions>
			<Button href="/docs" class="rounded-[6px]">Get Started</Button>
			<Button href="/components" variant="outline" class="rounded-[6px]">Components</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<section>
		<ExamplesNav />
		<div class="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
			{@render children?.()}
		</div>
	</section>
</div>
