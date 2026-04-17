<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import DocsToc from "$lib/components/docs-toc.svelte";
	import { findNeighbors } from "$lib/config.js";
	import { page } from "$app/state";
	import Cta from "$lib/components/cta.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import Ethical from "$lib/components/ethical.svelte";
	import DocsCopyPage from "$lib/components/docs-copy-page.svelte";
	import CtaMobile from "$lib/components/cta-mobile.svelte";

	let { data } = $props();

	const Markdown = $derived(data.component);
	const doc = $derived(data.metadata);
	const neighbors = $derived(findNeighbors(page.url.pathname));
	const isChangelog = $derived(page.url.pathname.startsWith("/docs/changelog"));
</script>

<Metadata
	title={doc.title}
	description={doc.description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}`,
	}}
	ogType="article"
/>

<!--
NOTE: The TOC needs to come first in the DOM order to prevent CLS, so we flex-row-reverse
the docs container. The issue this resolves is prominent on slow connections (3G).
  -->
<div
	data-slot="docs"
	class="flex scroll-mt-24 flex-row-reverse items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
	id="main-content"
>
	<div
		class="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex"
		data-llm-ignore
	>
		<div class="h-(--top-spacing) shrink-0"></div>
		{#if doc.toc.length}
			<div class="no-scrollbar flex flex-col gap-8 overflow-y-auto px-8">
				<DocsToc toc={{ items: doc.toc }} />
				<div class="h-12"></div>
			</div>
		{/if}
		<div class="flex flex-1 flex-col gap-12 px-6">
			<Cta />
		</div>
		<div class="flex flex-col gap-12 px-6">
			<Ethical />
		</div>
	</div>
	<div class="flex min-w-0 flex-1 flex-col">
		<div class="h-(--top-spacing) shrink-0"></div>
		<div
			class="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300"
		>
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between md:items-start">
						<h1 class="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
							{doc.title}
						</h1>
						<div class="docs-nav flex items-center gap-2" data-llm-ignore>
							<div class="hidden md:block">
								<DocsCopyPage />
							</div>
							<div class="ml-auto flex gap-2">
								{#if neighbors.previous}
									<Button
										variant="secondary"
										size="icon"
										class="extend-touch-target size-8 shadow-none md:size-7"
										href={neighbors.previous.href}
									>
										<ArrowLeftIcon />
										<span class="sr-only">Previous</span>
									</Button>
								{/if}
								{#if neighbors.next}
									<Button
										variant="secondary"
										size="icon"
										class="extend-touch-target size-8 shadow-none md:size-7"
										href={neighbors.next.href}
									>
										<span class="sr-only">Next</span>
										<ArrowRightIcon />
									</Button>
								{/if}
							</div>
						</div>
					</div>
					{#if data.metadata.description}
						<p
							class="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]"
						>
							{doc.description}
						</p>
					{/if}
				</div>
			</div>
			<div class=" -mb-2">
				<CtaMobile />
			</div>
			<div class="w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
				<Markdown viewerData={data.viewerData} />
			</div>
			{#if !isChangelog}
				<div
					class="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0"
					data-llm-ignore
				>
					{#if neighbors.previous}
						<Button
							size="sm"
							variant="secondary"
							class="shadow-none"
							href={neighbors.previous.href}
						>
							<ArrowLeftIcon />
							{neighbors.previous.title}
						</Button>
					{/if}
					{#if neighbors.next}
						<Button
							size="sm"
							variant="secondary"
							class="ml-auto shadow-none"
							href={neighbors.next.href}
						>
							{neighbors.next.title}
							<ArrowRightIcon />
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
