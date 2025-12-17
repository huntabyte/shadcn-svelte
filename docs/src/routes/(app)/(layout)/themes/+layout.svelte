<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";

	let { children } = $props();

	const title = "Pick a Color. Make it yours.";
	const description =
		"Try our hand-picked themes. Copy and paste them into your project. New theme editor coming soon.";
</script>

<Metadata
	{title}
	{description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
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
