<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
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

<div>
	<PageHeader>
		<Announcement />
		<PageHeaderHeading>{title}</PageHeaderHeading>
		<PageHeaderDescription>{description}</PageHeaderDescription>
		<PageActions>
			<Button href="#themes" size="sm">Browse Themes</Button>
			<Button href="/docs/theming" variant="ghost" size="sm">Documentation</Button>
		</PageActions>
	</PageHeader>
	{@render children()}
</div>
