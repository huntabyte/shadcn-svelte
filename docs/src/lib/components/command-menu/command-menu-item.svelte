<script lang="ts">
	import { cn } from "cn";
	import * as Command from "$lib/registry/ui/command/index.js";
	import type { ComponentProps } from "svelte";

	let {
		children,
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Command.Item> = $props();
</script>

<Command.Item
	bind:ref
	class={cn(
		"h-9 rounded-md border border-transparent !px-3 font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Command.Item>
