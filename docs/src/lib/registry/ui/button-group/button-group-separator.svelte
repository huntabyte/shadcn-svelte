<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";

	let {
		class: className,
		orientation = "vertical",
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	data-slot="button-group-separator"
	{orientation}
	class={cn("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)}
	{...restProps}
/>
