<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const description = ctx.getDescription();
</script>

<div
	{...$description}
	use:description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</div>
