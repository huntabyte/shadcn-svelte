<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<!-- parity-ignore: Bits does not emit Base UI data-empty; callers conditionally render Empty, so force it visible -->
<div
	bind:this={ref}
	data-slot="combobox-empty"
	class={cn("cn-combobox-empty block!", className)}
	{...restProps}
>
	{@render children?.()}
</div>
