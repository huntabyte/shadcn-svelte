<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ChartConfig, getPayloadConfigFromPayload } from "./index.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		payload: unknown;
		config: ChartConfig;
		hideIcon?: boolean;
		verticalAlign?: "top" | "bottom";
	};

	export let payload: $$Props["payload"];
	export let config: $$Props["config"];
	export let hideIcon: $$Props["hideIcon"] = false;
	export let verticalAlign: $$Props["verticalAlign"] = "bottom";
	let className: $$Props["class"] = undefined;
	export { className as class };

	$: itemConfig = getPayloadConfigFromPayload(config, payload);
</script>

{#if itemConfig}
	<div
		class={cn(
			"flex items-center justify-center gap-4",
			verticalAlign === "top" ? "pb-3" : "pt-3",
			className
		)}
	>
		{#each itemConfig as item}
			<div
				class={cn("[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:size-3")}
			>
				{#if item?.icon && !hideIcon}
					<item.icon />
				{:else}
					<div
						class="size-2 shrink-0 rounded-[2px] bg-[--color-bg]"
						style="--color-bg: {item?.color};"
					></div>
				{/if}
				{item?.label}
			</div>
		{/each}
	</div>
{/if}
