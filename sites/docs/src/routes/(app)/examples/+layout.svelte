<script lang="ts">
	import Announcement from "$lib/components/docs/announcement.svelte";
	import ExamplesNav from "$lib/components/docs/examples-nav/examples-nav.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let { children } = $props();

	// todo meta
	// const title = "Examples";
	// const description = "Check out some examples app built using the components.";
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>Build your component library</PageHeader.Heading>
	<PageHeader.Description>
		A set of beautifully-designed, accessible components and a code distribution platform. Open
		Source. Open Code.
	</PageHeader.Description>
	<PageHeader.Actions>
		<Button href="/docs" size="sm">Get Started</Button>
		<Button href="/blocks" size="sm" variant="ghost">Browse Blocks</Button>
	</PageHeader.Actions>
</PageHeader.Root>
<div class="border-grid border-b">
	<div class="container-wrapper">
		<div class="container py-4">
			<ExamplesNav />
		</div>
	</div>
</div>
<div class="container-wrapper">
	<div class="container py-6">
		<section class="bg-background overflow-hidden rounded-[0.5rem] border shadow">
			{@render children()}
		</section>
	</div>
</div>
