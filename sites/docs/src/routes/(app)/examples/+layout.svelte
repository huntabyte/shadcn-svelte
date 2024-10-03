<script lang="ts">
	import { Announcement, ExamplesNav } from "$lib/components/docs/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
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
			<Button href="/docs" size="sm">Get Started</Button>
			<Button href="/components" size="sm" variant="ghost">Components</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<section>
		<ExamplesNav />
		<div class="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
			<slot />
		</div>
	</section>
</div>
