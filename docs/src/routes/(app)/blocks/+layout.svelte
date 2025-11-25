<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";

	import BlocksNav from "$lib/components/blocks-nav.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageNav from "$lib/components/page-nav.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import { ogMetadata } from "./ogMetadata.js";

	let { children } = $props();

	const {title, url, description} = ogMetadata
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
	<PageHeaderHeading>{title}</PageHeaderHeading>
	<PageHeaderDescription>{description}</PageHeaderDescription>
	<PageActions>
		<Button href="#blocks" size="sm">Browse Blocks</Button>
		<!-- <Button href="/docs/blocks" variant="ghost" size="sm">Add a block</Button> -->
	</PageActions>
</PageHeader>
<PageNav>
	<BlocksNav />
	<Button
		size="sm"
		variant="secondary"
		href="/blocks/sidebar"
		class="me-7 hidden shadow-none lg:flex"
	>
		Browse all blocks
	</Button>
</PageNav>
<div class="container-wrapper section-soft flex-1 md:py-12">
	<div class="container">{@render children?.()}</div>
</div>
