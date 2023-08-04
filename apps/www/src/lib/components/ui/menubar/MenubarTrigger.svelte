<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = HTMLButtonAttributes & {
		asChild?: boolean;
		class?: string | null | undefined;
	};
	const trigger = ctx.getTrigger();
</script>

<div
	use:melt={$trigger}
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
