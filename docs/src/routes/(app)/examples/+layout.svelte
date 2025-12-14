<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import ExamplesNav from "$lib/components/examples-nav.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageNav from "$lib/components/page-nav.svelte";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { ogMetadata } from "./ogMetadata.js";

	let { children } = $props();

	const { title, url, description } = ogMetadata;
</script>

<Metadata
	{title}
	{description}
	ogImage={{
		url,
	}}
/>

<PageHeader>
	<Announcement />
	<PageHeaderHeading>Build your Component Library</PageHeaderHeading>
	<PageHeaderDescription>
		A set of beautifully-designed, accessible components and a code distribution platform. Open
		Source. Open Code.
	</PageHeaderDescription>
	<PageActions>
		<Button href="/docs" size="sm">Get Started</Button>
		<Button href="/blocks" size="sm" variant="ghost">Browse Blocks</Button>
	</PageActions>
</PageHeader>
<PageNav id="examples">
	<ExamplesNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
	<ThemeSelector class="me-4 hidden md:block" />
</PageNav>
<div class="container-wrapper section-soft flex flex-1 flex-col pb-6">
	<div class="theme-container container flex flex-1 scroll-mt-20 flex-col">
		<div
			class="bg-background flex flex-col overflow-hidden rounded-lg border bg-clip-padding md:flex-1 xl:rounded-xl"
		>
			{@render children()}
		</div>
	</div>
</div>
