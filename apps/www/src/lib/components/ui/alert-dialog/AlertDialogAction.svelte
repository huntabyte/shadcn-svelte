<script lang="ts">
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";
	import { ctx } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const action = ctx.getClose();
</script>

<button
	{...$action}
	use:action
	class={cn(buttonVariants(), className)}
	{...$$restProps}
>
	<slot />
</button>
