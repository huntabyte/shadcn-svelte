<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import Search from "lucide-svelte/icons/search";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div class="flex items-center border-b px-3" data-command-input-wrapper="">
	<Search class="mr-2 size-4 shrink-0 opacity-50" />
	<CommandPrimitive.Input
		class={cn(
			"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			className
		)}
		bind:ref
		bind:value
		{...restProps}
	/>
</div>
