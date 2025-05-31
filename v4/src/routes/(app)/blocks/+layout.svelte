<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";

	import BlocksNav from "$lib/components/blocks-nav.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";

	let { children } = $props();

	const title = "Building Blocks for the Web";
	const description =
		"Clean, modern building blocks. Copy and paste into your apps. Open Source. Free forever.";
</script>

<PageHeader>
	<Announcement />
	<PageHeaderHeading>{title}</PageHeaderHeading>
	<PageHeaderDescription>{description}</PageHeaderDescription>
	<PageActions>
		<Button href="#blocks" size="sm">Browse Blocks</Button>
		<Button href="/docs/blocks" variant="ghost" size="sm">Add a block</Button>
	</PageActions>
</PageHeader>
<div id="blocks" class="border-grid scroll-mt-24 border-b">
	<div class="container-wrapper">
		<div class="container flex items-center py-4">
			<BlocksNav />
		</div>
	</div>
</div>
<div class="container-wrapper flex-1">{@render children()}</div>
