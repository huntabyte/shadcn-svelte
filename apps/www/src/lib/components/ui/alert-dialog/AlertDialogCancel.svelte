<script lang="ts">
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { ctx } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const cancel = ctx.getClose();
</script>

<button
	{...$cancel}
	use:cancel
	on:m-click
	on:m-keydown
	class={cn(
		buttonVariants({ variant: "outline" }),
		"mt-2 sm:mt-0",
		className
	)}
	{...$$restProps}
>
	<slot />
</button>
