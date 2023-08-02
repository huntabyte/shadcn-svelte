<script lang="ts">
	import { cn } from "$lib/utils";
	import { getLabel, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const label = getLabel();
</script>

<label
	use:melt={$label}
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className
	)}
	{...$$restProps}
>
	<slot />
</label>
