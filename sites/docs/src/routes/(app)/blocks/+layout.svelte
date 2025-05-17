<script lang="ts">
	import Announcement from "$lib/components/docs/announcement.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import BlocksNav from "$lib/components/docs/blocks-nav.svelte";
	import "../../../styles/markdown.css";

	let { children } = $props();

	const title = "Building Blocks for the Web";
	const description =
		"Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.";
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>{title}</PageHeader.Heading>
	<PageHeader.Description>{description}</PageHeader.Description>
	<PageHeader.Actions>
		<Button href="#blocks" size="sm">Browse Blocks</Button>
		<Button href="/docs/blocks" variant="ghost" size="sm">Add a block</Button>
	</PageHeader.Actions>
</PageHeader.Root>
<div id="blocks" class="border-grid scroll-mt-24 border-b">
	<div class="container-wrapper">
		<div class="container flex items-center py-4">
			<BlocksNav />
		</div>
	</div>
</div>
<div class="container-wrapper flex-1">{@render children()}</div>
