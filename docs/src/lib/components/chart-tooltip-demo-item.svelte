<script lang="ts">
	import type { TooltipPayload } from "$lib/registry/ui/chart/chart-utils.js";
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		hideLabel = false,
		indicator = "dot",
		hideIndicator = false,
		label,
		labelClassName,
		payload,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
		hideLabel?: boolean;
		label?: string;
		indicator?: "line" | "dot" | "dashed";
		nameKey?: string;
		hideIndicator?: boolean;
		labelClassName?: string;
		payload: {
			name: string;
			value: number;
			color: string;
		}[];
		formatter?: Snippet<
			[
				{
					value: unknown;
					name: string;
					item: TooltipPayload;
					index: number;
					payload: TooltipPayload[];
				},
			]
		>;
	} = $props();

	const nestLabel = $derived(payload.length === 1 && indicator === "dot");
</script>

{#snippet TooltipLabel()}
	{#if label && !hideLabel}
		<div class={cn("font-medium", labelClassName)}>
			{label}
		</div>
	{/if}
{/snippet}

<div
	class={cn(
		"border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
		className
	)}
	{...restProps}
>
	{#if !nestLabel}
		{@render TooltipLabel()}
	{/if}
	<div class="grid gap-1.5">
		{#each payload as item, i (item.name + i)}
			{@const indicatorColor = item.color}
			<div
				class={cn(
					"[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
					indicator === "dot" && "items-center"
				)}
			>
				{#if !hideIndicator}
					<div
						style="--color-bg: {indicatorColor}; --color-border: {indicatorColor};"
						class={cn(
							"shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
							{
								"size-2.5": indicator === "dot",
								"h-full w-1": indicator === "line",
								"w-0 border-[1.5px] border-dashed bg-transparent":
									indicator === "dashed",
								"my-0.5": nestLabel && indicator === "dashed",
							}
						)}
					></div>
				{/if}
				<div
					class={cn(
						"flex flex-1 justify-between leading-none",
						nestLabel ? "items-end" : "items-center"
					)}
				>
					<div class="grid gap-1.5">
						{#if nestLabel}
							{@render TooltipLabel()}
						{/if}
						<span class="text-muted-foreground">
							{item.name}
						</span>
					</div>
					{#if item.value}
						<span class="text-foreground font-mono font-medium tabular-nums">
							{item.value.toLocaleString()}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
