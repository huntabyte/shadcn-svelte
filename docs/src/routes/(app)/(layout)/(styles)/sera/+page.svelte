<script lang="ts">
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import AudienceAnalytics from "./audience-analytics/audience-analytics.svelte";
	import ImagePreview from "./components/image-preview.svelte";
	import LazyPreview from "./components/lazy-preview.svelte";
	import "./style.css";

	const title = "Introducing Sera";
	const description =
		"Minimal. Editorial. Typographic. Underline Controls and Uppercase Headings. Shaped by Print Design Principles.";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<PageHeader>
	<PageHeaderHeading
		class="font-(family-name:--font-playfair-display) text-[2.875rem] tracking-tight!"
	>
		{title}
	</PageHeaderHeading>
	<PageHeaderDescription class="max-w-2xl text-pretty md:text-balance">
		{description}
	</PageHeaderDescription>
	<PageActions class="**:[.container]:justify-start">
		<Button href="/create?preset=b4xFeBLg4O" size="sm">
			Open in shadcn-svelte/create
			<ArrowRightIcon data-icon="inline-end" />
		</Button>
	</PageActions>
</PageHeader>

<ImagePreview />

<div class="container-wrapper section-soft hidden flex-1 flex-col px-0 md:flex md:px-2 md:py-12">
	<div class="3xl:max-w-[2000px] container flex flex-1 flex-col gap-10 px-0 md:px-6">
		<AudienceAnalytics />
		<LazyPreview name="articleDirectory" />
		<LazyPreview name="emptyState" />
		<LazyPreview name="editArticle" />
		<LazyPreview name="mediaLibrary" />
		<LazyPreview name="mediaLibraryTable" />
	</div>
</div>
