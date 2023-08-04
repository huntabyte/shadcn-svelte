<script lang="ts">
	import { ctx, melt } from ".";
	import { Search } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import type { HTMLInputAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLInputAttributes;

	const input = ctx.getInput();
</script>

<div class="flex items-center border-b px-3">
	<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
	<input
		use:melt={$input}
		class={cn(
			"flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...$$restProps}
	/>
</div>
