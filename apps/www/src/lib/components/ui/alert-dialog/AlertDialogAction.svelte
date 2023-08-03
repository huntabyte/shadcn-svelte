<script lang="ts">
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const action = ctx.getClose();
</script>

<button
	use:melt={$action}
	on:m-click
	on:m-keydown
	class={cn(buttonVariants(), className)}
	{...$$restProps}
>
	<slot />
</button>
