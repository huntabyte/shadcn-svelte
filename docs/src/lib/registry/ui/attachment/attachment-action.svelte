<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		variant = "ghost",
		size = "icon-xs",
		...restProps
	}: ComponentProps<typeof Button> = $props();
</script>

<Button
	data-slot="attachment-action"
	class={cn("cn-attachment-action", className)}
	{variant}
	{size}
	{...restProps}
/>
