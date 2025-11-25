<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import ColorsNav from "$lib/components/colors-nav.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import { ogMetadata } from "./ogMetadata.js";

	const {title, url, description} = ogMetadata

	let { children } = $props();
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
			<Button href="#colors" size="sm">Browse Colors</Button>
			<Button href="/docs/theming" variant="ghost" size="sm">Documentation</Button>
		</PageActions>
	</PageHeader>
	<div class="hidden">
		<div class="container-wrapper">
			<div class="container flex items-center justify-between gap-8 py-4">
				<ColorsNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
			</div>
		</div>
	</div>
	<div class="container-wrapper">
		<div class="container py-6">
			<section id="colors" class="scroll-mt-20">
				{@render children?.()}
			</section>
		</div>
	</div>
</div>
