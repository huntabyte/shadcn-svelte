<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import type { PageData } from "./$types.js";
	import Carbon from "$lib/components/docs/carbon.svelte";
	import { page } from "$app/state";
	import DocsPager from "$lib/components/docs/docs-pager.svelte";
	import TableOfContents from "$lib/components/docs/table-of-contents.svelte";
	import { cn } from "$lib/utils.js";
	import { badgeVariants } from "$lib/registry/ui/badge/badge.svelte";

	let { data }: { data: PageData } = $props();

	const Markdown = $derived(data.component);
	const doc = $derived(data.metadata);
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
	<div class="mx-auto w-full min-w-0 max-w-2xl">
		<div class="text-muted-foreground mb-4 flex items-center space-x-1 text-sm leading-none">
			<a href="/docs" class="truncate"> Docs </a>
			<ChevronRight class="h-3.5 w-3.5" />
			<div class="text-foreground">{doc.title}</div>
		</div>
		<div class="space-y-2">
			<h1 class={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
				{doc.title}
			</h1>
			{#if doc.description}
				<p class="text-muted-foreground text-balance text-base">
					{doc.description}
				</p>
			{/if}
		</div>
		{#if doc.links}
			<div class="flex items-center space-x-2 pt-4">
				{#if doc.links?.doc}
					<a
						href={doc.links.doc}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						Docs
						<ExternalLink class="h-3 w-3" />
					</a>
				{/if}
				{#if doc.links?.api}
					<a
						href={doc.links.api}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						API Reference
						<ExternalLink class="h-3 w-3" />
					</a>
				{/if}
			</div>
		{/if}
		<div class="pb-12 pt-8" id="markdown">
			<div class="markdown">
				<Markdown />
			</div>
		</div>
		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div class="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
			<div class="no-scrollbar h-full overflow-auto pb-10">
				{#key page.url.pathname}
					<TableOfContents />
				{/key}
			</div>
			<div class="z-10 pt-4">
				<Carbon />
			</div>
		</div>
	</div>
</main>
