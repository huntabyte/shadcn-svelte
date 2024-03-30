<script lang="ts">
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import Code from "svelte-radix/Code.svelte";
	import ExternalLink from "svelte-radix/ExternalLink.svelte";
	import type { PageData } from "./$types.js";
	import { config } from "$lib/stores/index.js";
	import { page } from "$app/stores";
	import { DocsPager, TableOfContents } from "$lib/components/docs/index.js";
	import { badgeVariants } from "$lib/registry/new-york/ui/badge/index.js";
	import { cn } from "$lib/utils.js";

	export let data: PageData;
	$: markdown = data.component;
	$: doc = data.metadata;
	$: componentSource = data.metadata.source?.replace("default", $config.style ?? "default");
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
	<div class="mx-auto w-full min-w-0">
		<div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
			<div class="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
			<ChevronRight class="h-4 w-4" />
			<div class="font-medium text-foreground">{doc.title}</div>
		</div>
		<div class="space-y-2">
			<h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
				{doc.title}
			</h1>
			{#if doc.description}
				<p class="text-balance text-lg text-muted-foreground">
					{doc.description}
				</p>
			{/if}
		</div>
		{#if doc.source || doc.bits}
			<div class="flex items-center space-x-2 pt-4">
				{#if componentSource}
					<a
						href={componentSource}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						Component Source
						<Code class="h-3.5 w-3.5" />
					</a>
				{/if}
				{#if doc.bits}
					<a
						href={doc.bits}
						target="_blank"
						rel="noreferrer"
						class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
					>
						Primitive API Reference
						<ExternalLink class="h-3 w-3" />
					</a>
				{/if}
			</div>
		{/if}
		<div class="markdown pb-12 pt-8" id="markdown">
			<svelte:component this={markdown} form={data.form} />
		</div>
		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-4">
			{#key $page.url.pathname}
				<TableOfContents />
			{/key}
		</div>
	</div>
</main>
