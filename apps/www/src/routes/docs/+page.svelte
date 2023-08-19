<script lang="ts">
	import type { SvelteComponentTyped } from "svelte";
	import type { PageData } from "./$types";
	import { ChevronRight } from "lucide-svelte";
	import Balancer from "svelte-wrap-balancer";
	import { page } from "$app/stores";
	import { DocsPager, TableOfContents } from "$components/docs";
	import { Separator } from "@/registry/default/ui/separator";
	import { cn } from "$lib/utils";

	export let data: PageData;
	// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
	type Component = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as Component;
	$: doc = data.metadata;
</script>

<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
	<div class="mx-auto w-full min-w-0">
		<div
			class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground"
		>
			<div class="overflow-hidden text-ellipsis whitespace-nowrap">
				Docs
			</div>
			<ChevronRight class="h-4 w-4" />
			<div class="font-medium text-foreground">{doc.title}</div>
		</div>
		<div class="space-y-2">
			<h1 class={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
				{doc.title}
			</h1>
			{#if doc.description}
				<p class="text-lg text-muted-foreground">
					<Balancer>
						{doc.description}
					</Balancer>
				</p>
			{/if}
		</div>
		<Separator class="my-4 md:my-6" />
		<div class="mdsvex" id="mdsvex">
			<svelte:component this={component} />
		</div>
		<Separator class="my-4 md:my-6" />
		<DocsPager />
	</div>
	<div class="hidden text-sm xl:block">
		<div
			class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6"
		>
			{#key $page.url.pathname}
				<TableOfContents />
			{/key}
		</div>
	</div>
</main>
