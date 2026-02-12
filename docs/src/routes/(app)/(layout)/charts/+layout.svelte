<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import PageNav from "$lib/components/page-nav.svelte";
	import ChartsNav from "$lib/components/charts-nav.svelte";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import Metadata from "$lib/components/metadata.svelte";

	let { children } = $props();
	const title = "Beautiful Charts & Graphs";
	const description =
		"A collection of ready-to-use chart components built with LayerChart. From basic charts to rich data displays, copy and paste into your apps.";
</script>

<Metadata
	{title}
	{description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
	}}
/>

<PageHeader>
	<Announcement />
	<PageHeaderHeading>{title}</PageHeaderHeading>
	<PageHeaderDescription>{description}</PageHeaderDescription>
	<PageActions>
		<Button href="#charts" size="sm">Browse Charts</Button>
		<Button href="/docs/components/chart" variant="ghost" size="sm">Documentation</Button>
	</PageActions>
</PageHeader>
<PageNav id="charts">
	<ChartsNav />
	<ThemeSelector class="me-4 hidden md:flex" />
</PageNav>
<div class="container-wrapper section-soft flex-1">
	<div class="container pb-6">
		<section class="theme-container">{@render children?.()}</section>
	</div>
</div>
