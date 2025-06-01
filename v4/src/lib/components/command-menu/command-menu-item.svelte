<script lang="ts">
	import { useMutationObserver } from "$lib/hooks/use-mutation-observer.svelte.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		children,
		ref = $bindable(null),
		class: className,
		onHighlight,
		...restProps
	}: ComponentProps<typeof Command.Item> & {
		onHighlight?: () => void;
		"data-selected"?: string;
		"aria-selected"?: boolean;
	} = $props();

	useMutationObserver(
		() => ref,
		(mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "aria-selected" &&
					ref?.getAttribute("aria-selected") === "true"
				) {
					onHighlight?.();
				}
			}
		},
		{
			attributes: true,
		}
	);
</script>

<Command.Item
	bind:ref
	class={cn(
		"data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Command.Item>
