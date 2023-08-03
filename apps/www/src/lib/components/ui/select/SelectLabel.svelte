<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { groupLabel, key } = ctx.getGroupLabel();
</script>

<div
	use:melt={$groupLabel(key)}
	class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
	{...$$restProps}
>
	<slot />
</div>
