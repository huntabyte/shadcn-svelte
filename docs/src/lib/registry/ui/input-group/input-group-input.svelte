<script lang="ts">
	import { cn } from "cn";
	import { Input } from "$lib/registry/ui/input/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...props
	}: ComponentProps<typeof Input> = $props();
</script>

<Input
	bind:ref
	data-slot="input-group-control"
	class={cn("cn-input-group-input flex-1", className)}
	bind:value
	{...props}
/>
