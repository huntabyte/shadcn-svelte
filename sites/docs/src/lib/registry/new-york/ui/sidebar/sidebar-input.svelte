<script lang="ts">
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...restProps
	}: ComponentProps<typeof Input> = $props();
</script>

<Input
	bind:ref
	bind:value
	data-sidebar="input"
	class={cn(
		"bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2",
		className
	)}
	{...restProps}
/>
