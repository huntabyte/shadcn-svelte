<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import Code from "@lucide/svelte/icons/code";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import type { PageData } from "./$types.js";
	import { ScrollArea } from "$lib/registry/new-york/ui/scroll-area/index.js";
	import { config } from "$lib/stores/index.js";
	import DocsPager from "$lib/components/docs/docs-pager.svelte";
	import TableOfContents from "$lib/components/docs/table-of-contents.svelte";
	import { badgeVariants } from "$lib/registry/new-york/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import Carbon from "$lib/components/docs/carbon.svelte";
	import { page } from "$app/state";

	let { data }: { data: PageData } = $props();

	const Markdown = $derived(data.component);
	const doc = $derived(data.metadata);
	const componentSource = $derived(
		data.metadata.links?.source?.replace("default", $config.style ?? "default")
	);
	const apiLink = $derived(doc.links?.api);
	const docLink = $derived(doc.links?.doc);
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
		{#if apiLink || componentSource || docLink}
			<div class="flex items-center space-x-2 pt-4">
				{#if docLink}
					<a
						href={docLink}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						Docs
						<ExternalLink class="size-3" />
					</a>
				{/if}
				{#if apiLink}
					<a
						href={apiLink}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						API Reference
						<ExternalLink class="size-3" />
					</a>
				{/if}
				{#if componentSource}
					<a
						href={componentSource}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						Component Source
						<Code class="size-3.5" />
					</a>
				{/if}
			</div>
		{/if}
		<div class="markdown pb-12 pt-8" id="markdown">
			<Markdown form={data.form} />
		</div>
		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div class="sticky top-14 -mt-10 h-[calc(100vh-3.5rem)] py-8">
			<ScrollArea class="h-full">
				{#key page.url.pathname}
					<TableOfContents />
				{/key}
				<Carbon />
			</ScrollArea>
		</div>
	</div>
</main>
