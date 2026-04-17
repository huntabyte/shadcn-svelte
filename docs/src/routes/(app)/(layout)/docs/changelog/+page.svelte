<script lang="ts">
	import type { ChangelogPage } from "$lib/docs.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import RssIcon from "@lucide/svelte/icons/rss";
	import Metadata from "$lib/components/metadata.svelte";
	import Cta from "$lib/components/cta.svelte";
	import Ethical from "$lib/components/ethical.svelte";

	let { data } = $props();

	const latestPages = $derived(data.latestPages as ChangelogPage[]);
	const olderPages = $derived(data.olderPages as ChangelogPage[]);
</script>

<Metadata
	title="Changelog"
	description="Latest updates and announcements."
	ogImage={{
		url: `/og?title=${encodeURIComponent("Changelog")}&description=${encodeURIComponent("Latest updates and announcements.")}`,
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
		<div class="no-scrollbar overflow-y-auto px-8">
			<div class="flex flex-col gap-2 p-4 pt-0 text-sm">
				<p class="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-medium">
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
				<div class="flex items-center justify-between md:items-start">
					<h1 class="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
						Changelog
					</h1>
					<div class="docs-nav flex items-center gap-2" data-llm-ignore>
						<Button
							variant="secondary"
							size="sm"
							href="/rss.xml"
							target="_blank"
							rel="noopener noreferrer"
						>
							<RssIcon />
							RSS
						</Button>
					</div>
				</div>
				<p class="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
					Latest updates and announcements.
				</p>
			</div>
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
								{@const [date, ...titleParts] = changelogPage.metadata.title.split(" - ")}
								<a
									href={changelogPage.href}
									class="bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col rounded-xl px-4 py-3 transition-colors"
								>
									<span class="text-muted-foreground text-xs">{date}</span>
									<span class="text-sm font-medium">{titleParts.join(" - ")}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
