<script lang="ts">
	import { afterNavigate, preloadData } from "$app/navigation";
	import Announcement from "$lib/components/announcement.svelte";
	import { registryCategories } from "$lib/registry/registry-categories.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	import BlocksNav from "$lib/components/blocks-nav.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageNav from "$lib/components/page-nav.svelte";

	let { children } = $props();
	const routes = registryCategories.filter((c) => !c.hidden).map((c) => `/blocks/${c.slug}`);
	routes.push("/blocks");

	const mobile = new IsMobile();

	afterNavigate(async (nav) => {
		// don't preload when on mobile
		if (mobile.current) return;

		const slug = nav.to?.params?.["category"];
		const href = slug ? `/blocks/${slug}` : "/blocks";
		await nav.complete;
		const preload = routes.filter((r) => r !== href);
		await Promise.all(preload.map((href) => preloadData(href)));
	});

	const title = "Building Blocks for the Web";
	const description =
		"Clean, modern building blocks. Works with all Svelte projects. Copy and paste into your apps. Open Source. Free forever.";
</script>

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
		class="mr-7 hidden shadow-none lg:flex"
	>
		Browse all blocks
	</Button>
</PageNav>
<div class="container-wrapper section-soft flex-1 md:py-12">
	<div class="container">{@render children?.()}</div>
</div>
