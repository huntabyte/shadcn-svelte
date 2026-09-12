<script lang="ts">
	import { cn } from "cn";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	bind:ref
	data-slot="item-separator"
	orientation="horizontal"
	class={cn("cn-item-separator", className)}
	{...restProps}
/>
