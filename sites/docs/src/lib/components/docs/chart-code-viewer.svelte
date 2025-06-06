<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { MediaQuery } from "svelte/reactivity";
	import ChartCopyButton from "./chart-copy-button.svelte";
	import type { Chart } from "./chart-display.svelte";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import TmpManualTheme from "./tmp-manual-theme.svelte";
	import { tmpChartThemeCode } from "$lib/tmp-chart-theme-code.js";

	let tab = $state("code");

	const isDesktop = new MediaQuery("min-width: 768px");

	let {
		chart,
		class: className,
		children,
	}: HTMLAttributes<HTMLDivElement> & { chart: Chart } = $props();
</script>

{#snippet Content()}
	<Tabs.Root class="relative flex h-full flex-1 flex-col overflow-hidden p-4" bind:value={tab}>
		<div class="flex w-full items-center">
			<Tabs.List
				class="h-7 w-auto rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]"
			>
				<Tabs.Trigger value="code" class="h-[1.45rem] rounded-sm px-2 text-xs">
					Code
				</Tabs.Trigger>
				<Tabs.Trigger value="theme" class="h-[1.45rem] rounded-sm px-2 text-xs">
					Theme
				</Tabs.Trigger>
			</Tabs.List>
			<div class="ml-auto flex items-center justify-center gap-2">
				{#if tab === "code"}
					<ChartCopyButton code={chart.files?.[0]?.content ?? ""} />
				{:else}
					<ChartCopyButton code={tmpChartThemeCode} />
				{/if}
			</div>
		</div>
		<Tabs.Content
			value="code"
			class="h-full flex-1 flex-col overflow-hidden data-[state=active]:flex"
		>
			<div class="relative overflow-auto rounded-lg bg-black">
				<div
					data-rehype-pretty-code-fragment
					class="w-full overflow-hidden [&_pre]:overflow-auto [&_pre]:!bg-black [&_pre]:py-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html chart.highlightedCode}
				</div>
			</div>
		</Tabs.Content>
		<Tabs.Content
			value="theme"
			class="h-full flex-1 flex-col overflow-hidden data-[state=active]:flex"
		>
			<div class="relative overflow-auto rounded-lg bg-black">
				<div
					data-rehype-pretty-code-fragment
					class="w-full overflow-hidden [&_pre]:overflow-auto [&_pre]:!bg-black [&_pre]:py-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
				>
					<TmpManualTheme />
				</div>
			</div>
		</Tabs.Content>
	</Tabs.Root>
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
				"flex flex-col gap-0 border-l-0 p-0 sm:max-w-sm md:w-[700px] md:max-w-[700px] dark:border-l",
				className
			)}
		>
			<div
				class="chart-wrapper hidden sm:block [&>div]:rounded-none [&>div]:border-0 [&>div]:border-b [&>div]:shadow-none [&_[data-chart]]:mx-auto [&_[data-chart]]:max-h-[35vh]"
			>
				{@render children?.()}
			</div>
			{@render Content()}
		</Sheet.Content>
	</Sheet.Root>
{/if}
