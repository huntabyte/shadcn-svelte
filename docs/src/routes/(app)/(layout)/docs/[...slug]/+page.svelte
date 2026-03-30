<script lang="ts">
	import type { ChangelogPage } from "$lib/docs.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import RssIcon from "@lucide/svelte/icons/rss";
	import DocsToc from "$lib/components/docs-toc.svelte";
	import { findNeighbors } from "$lib/navigation.js";
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
	const isChangelogIndex = $derived(page.url.pathname === "/docs/changelog");
	const changelogIndex = $derived(
		data.changelogIndex as { latestPages: ChangelogPage[]; olderPages: ChangelogPage[] } | null
	);
	const latestPages = $derived(changelogIndex?.latestPages ?? []);
	const olderPages = $derived(changelogIndex?.olderPages ?? []);
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
	class="flex flex-row-reverse items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
	id="main-content"
>
	<div
		class="sticky top-[calc(var(--header-height)+1px)] z-30 ms-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex"
		data-llm-ignore
	>
		<div class="h-(--top-spacing) shrink-0"></div>
		{#if isChangelogIndex}
			<div class="no-scrollbar overflow-y-auto px-8">
				<div class="flex flex-col gap-2 p-4 pt-0 text-sm">
					<p
						class="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-medium"
					>
						On This Page
					</p>
					{#each latestPages as changelogPage (changelogPage.href)}
						<a
							href={changelogPage.href}
							class="text-muted-foreground hover:text-foreground text-[0.8rem] no-underline transition-colors"
						>
							{changelogPage.metadata.title}
						</a>
					{/each}
					{#if olderPages.length > 0}
						<a
							href="#more-updates"
							class="text-muted-foreground hover:text-foreground text-[0.8rem] no-underline transition-colors"
						>
							More Updates
						</a>
					{/if}
				</div>
				<div class="h-12"></div>
			</div>
		{:else if doc.toc.length}
			<div class="no-scrollbar overflow-y-auto px-8">
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
			class="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300"
		>
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-2">
					<div class="flex items-start justify-between">
						<h1
							class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl"
						>
							{doc.title}
						</h1>
						<div class="docs-nav flex items-center gap-2" data-llm-ignore>
							{#if isChangelog}
								<Button
									variant="secondary"
									size="sm"
									class="h-8 shadow-none select-none md:h-7 md:text-[0.8rem]"
									href="/rss.xml"
									target="_blank"
									rel="noopener noreferrer"
								>
									<RssIcon />
									RSS
								</Button>
							{:else}
								<DocsCopyPage />
								{#if neighbors.previous}
									<Button
										variant="secondary"
										size="icon"
										class="extend-touch-target ms-auto size-8 shadow-none md:size-7"
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
							{/if}
						</div>
					</div>
					{#if data.metadata.description}
						<p class="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
							{doc.description}
						</p>
					{/if}
				</div>
			</div>
			<div class=" -mb-2">
				<CtaMobile />
			</div>
			{#if isChangelogIndex}
				<div class="w-full flex-1 pb-16 sm:pb-0">
					{#each latestPages as changelogPage (changelogPage.href)}
						{@const ChangelogMarkdown = changelogPage.component}
						<article class="mb-12 border-b pb-12">
							<h2 class="font-heading text-xl font-semibold tracking-tight">
								{changelogPage.metadata.title}
							</h2>
							<div class="prose-changelog mt-6 *:first:mt-0">
								<ChangelogMarkdown />
							</div>
						</article>
					{/each}
					{#if olderPages.length > 0}
						<div id="more-updates" class="mb-24 scroll-mt-24">
							<h2 class="font-heading mb-6 text-xl font-semibold tracking-tight">
								More Updates
							</h2>
							<div class="grid auto-rows-fr gap-3 sm:grid-cols-2">
								{#each olderPages as changelogPage (changelogPage.href)}
									{@const [date, ...titleParts] =
										changelogPage.metadata.title.split(" - ")}
									<a
										href={changelogPage.href}
										class="bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col rounded-xl px-4 py-3 transition-colors"
									>
										<span class="text-muted-foreground text-xs">{date}</span>
										<span class="text-sm font-medium"
											>{titleParts.join(" - ")}</span
										>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<div class="w-full flex-1 *:data-[slot=alert]:first:mt-0">
					<Markdown viewerData={data.viewerData} />
				</div>
			{/if}
		</div>
		{#if !isChangelog}
			<div
				class="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0"
				data-llm-ignore
			>
				{#if neighbors.previous}
					<Button
						variant="secondary"
						size="sm"
						class="shadow-none"
						href={neighbors.previous.href}
					>
						<ArrowLeftIcon />
						{neighbors.previous.title}
					</Button>
				{/if}
				{#if neighbors.next}
					<Button
						variant="secondary"
						size="sm"
						class="ms-auto shadow-none"
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
