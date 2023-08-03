<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const trigger = ctx.getTrigger();
</script>

<button
	use:melt={$trigger}
	class={cn(
		"flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...$$restProps}
>
	<slot />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</div>
</button>
