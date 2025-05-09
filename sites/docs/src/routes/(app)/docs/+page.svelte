<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import type { PageData } from "./$types.js";
	import Carbon from "$lib/components/docs/carbon.svelte";
	import { page } from "$app/state";
	import DocsPager from "$lib/components/docs/docs-pager.svelte";
	import TableOfContents from "$lib/components/docs/table-of-contents.svelte";
	import { cn } from "$lib/utils.js";

	let { data }: { data: PageData } = $props();

	const Component = $derived(data.component);
	const doc = $derived(data.metadata);
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
	<div class="mx-auto w-full min-w-0">
		<div class="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
			<div class="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
			<ChevronRight class="size-4" />
			<div class="text-foreground font-medium">{doc.title}</div>
		</div>
		<div class="space-y-2">
			<h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
				{doc.title}
			</h1>
			{#if doc.description}
				<p class="text-muted-foreground text-balance text-lg">
					{doc.description}
				</p>
			{/if}
		</div>

		<div class="markdown pb-12 pt-8" id="markdown">
			<Component />
		</div>

		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
			{#key page.url.pathname}
				<TableOfContents />
			{/key}
			<div class="z-10 pt-4">
				<Carbon />
			</div>
		</div>
	</div>
</main>
