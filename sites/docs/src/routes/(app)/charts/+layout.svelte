<script lang="ts">
	import Announcement from "$lib/components/docs/announcement.svelte";
	import ChartsNav from "$lib/components/docs/charts-nav.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let { children } = $props();

	const title = "Beautiful Charts";
	const description = "Built using LayerChart. Copy and paste into your apps. Open Source.";
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>{title}</PageHeader.Heading>
	<PageHeader.Description>{description}</PageHeader.Description>
	<PageHeader.Actions>
		<Button href="#charts" size="sm">Browse Charts</Button>
		<Button href="/docs/components/chart" variant="ghost" size="sm">Documentation</Button>
	</PageHeader.Actions>
</PageHeader.Root>
<div class="border-grid border-b">
	<div class="container-wrapper">
		<div class="container py-4">
			<ChartsNav />
		</div>
	</div>
</div>
<div class="container-wrapper">
	<div class="container py-6">
		<section id="charts" class="scroll-mt-20">
			{@render children()}
		</section>
	</div>
</div>
