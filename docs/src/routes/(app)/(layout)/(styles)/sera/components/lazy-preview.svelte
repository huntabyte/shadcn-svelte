<script lang="ts">
	import { onMount } from "svelte";
	import AudienceAnalytics from "../audience-analytics/audience-analytics.svelte";
	import ArticleDirectory from "../article-directory/article-directory.svelte";
	import EditArticle from "../edit-article/edit-article.svelte";
	import EmptyState from "../empty-state/empty-state.svelte";
	import MediaLibrary from "../media-library/media-library.svelte";
	import MediaLibraryTable from "../media-library-table/media-library-table.svelte";

	type LazyPreviewName =
		| "audienceAnalytics"
		| "articleDirectory"
		| "emptyState"
		| "editArticle"
		| "mediaLibrary"
		| "mediaLibraryTable";

	const PREVIEW_MIN_HEIGHTS: Record<LazyPreviewName, number> = {
		audienceAnalytics: 900,
		articleDirectory: 760,
		emptyState: 560,
		editArticle: 980,
		mediaLibrary: 880,
		mediaLibraryTable: 980,
	};

	const PREVIEW_COMPONENTS: Record<LazyPreviewName, typeof AudienceAnalytics> = {
		audienceAnalytics: AudienceAnalytics,
		articleDirectory: ArticleDirectory as typeof AudienceAnalytics,
		emptyState: EmptyState as typeof AudienceAnalytics,
		editArticle: EditArticle as typeof AudienceAnalytics,
		mediaLibrary: MediaLibrary as typeof AudienceAnalytics,
		mediaLibraryTable: MediaLibraryTable as typeof AudienceAnalytics,
	};

	let { name }: { name: LazyPreviewName } = $props();

	const PreviewComponent = $derived(PREVIEW_COMPONENTS[name]);
	const minHeight = $derived(PREVIEW_MIN_HEIGHTS[name]);

	let containerEl: HTMLDivElement | undefined = $state();
	let shouldRender = $state(false);

	onMount(() => {
		if (!containerEl || !("IntersectionObserver" in window)) {
			shouldRender = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					shouldRender = true;
					observer.disconnect();
				}
			},
			{ rootMargin: "800px 0px" }
		);

		observer.observe(containerEl);
		return () => observer.disconnect();
	});
</script>

<div bind:this={containerEl}>
	{#if shouldRender}
		<PreviewComponent />
	{:else}
		<div
			aria-hidden="true"
			class="preview theme-taupe bg-muted ring-foreground/5 @container/preview w-full flex-1 p-4 font-sans ring-1 [--gap:--spacing(4)] sm:p-6 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)]"
			style="min-height: {minHeight}px"
		>
			<div class="container flex flex-col gap-(--gap) py-(--gap)">
				<div class="flex items-center justify-between gap-4">
					<div class="flex flex-col gap-3">
						<div class="bg-background/80 h-5 w-44"></div>
						<div class="bg-background/60 h-3 w-56 max-w-full"></div>
					</div>
					<div class="bg-background/70 hidden h-8 w-28 sm:block"></div>
				</div>
				<div class="grid grid-cols-1 gap-(--gap) md:grid-cols-3">
					<div class="bg-background/70 min-h-48 md:col-span-2"></div>
					<div class="bg-background/70 min-h-48"></div>
				</div>
			</div>
		</div>
	{/if}
</div>
