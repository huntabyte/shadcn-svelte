<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { MediaQuery } from "svelte/reactivity";
	import ChartCopyButton from "./chart-copy-button.svelte";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getIconForLanguageExtension } from "./icons/icons.js";
	import type { HighlightedBlock } from "../../routes/api/block/[block]/+server.js";

	const isDesktop = new MediaQuery("min-width: 768px");

	let {
		chart,
		class: className,
		children,
		code,
	}: HTMLAttributes<HTMLDivElement> & { chart: HighlightedBlock; code: string } = $props();

	const Icon = getIconForLanguageExtension("svelte");
</script>

{#snippet Content()}
	<div class="flex min-h-0 flex-1 flex-col gap-0">
		<div
			class="chart-wrapper theme-container hidden sm:block [&_[data-chart]]:mx-auto [&_[data-chart]]:max-h-[35vh] [&>div]:rounded-none [&>div]:border-0 [&>div]:border-b [&>div]:shadow-none"
		>
			{@render children?.()}
		</div>
		<div class="flex min-w-0 flex-1 flex-col overflow-hidden p-4">
			<figure
				data-rehype-pretty-code-figure=""
				class="mt-0 flex h-auto min-w-0 flex-1 flex-col overflow-hidden"
			>
				<figcaption
					class="text-foreground [&>svg]:text-foreground flex h-12 shrink-0 items-center gap-2 border-b py-2 ps-4 pe-2 [&>svg]:size-4 [&>svg]:opacity-70"
					data-language="tsx"
				>
					<Icon />
					{chart.name}
					<div class="ms-auto flex items-center gap-2">
						<ChartCopyButton name={chart.name} {code} />
					</div>
				</figcaption>
				<div class="no-scrollbar overflow-y-auto">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html chart.files?.[0]?.highlightedContent ?? ""}
				</div>
			</figure>
		</div>
	</div>
{/snippet}

{#snippet Trigger({ props }: { props: Record<string, unknown> })}
	<Button
		size="sm"
		variant="outline"
		{...props}
		class="text-foreground hover:bg-muted dark:text-foreground h-6 rounded-[6px] border bg-transparent px-2 text-xs shadow-none"
	>
		View Code
	</Button>
{/snippet}

{#if !isDesktop.current}
	<Drawer.Root>
		<Drawer.Trigger child={Trigger} />
		<Drawer.Content
			class={cn(
				"flex max-h-[80vh] flex-col sm:max-h-[90vh] [&>div.bg-muted]:shrink-0",
				className
			)}
		>
			<Drawer.Header class="sr-only">
				<Drawer.Title>Code</Drawer.Title>
				<Drawer.Description>View the code for the chart.</Drawer.Description>
			</Drawer.Header>

			<div class="flex h-full flex-col overflow-auto">
				{@render Content()}
			</div>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Sheet.Root>
		<Sheet.Trigger child={Trigger} />
		<Sheet.Content
			side="right"
			class={cn(
				"flex flex-col gap-0 border-s-0 p-0 sm:max-w-sm md:w-[700px] md:max-w-[700px] dark:border-s",
				className
			)}
		>
			<Sheet.Header class="sr-only">
				<Sheet.Title>Code</Sheet.Title>
				<Sheet.Description>View the code for the chart.</Sheet.Description>
			</Sheet.Header>
			{@render Content()}
		</Sheet.Content>
	</Sheet.Root>
{/if}
