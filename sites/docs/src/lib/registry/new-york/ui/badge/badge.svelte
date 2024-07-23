<script lang="ts">
	import { type Variant, badgeVariants } from "./index.js";
	import { type PrimitiveAnchorAttributes, cn } from "$lib/utils.js";

	let {
		class: className,
		href = undefined,
		variant = "default",
		children,
		ref = $bindable(null),
		...restProps
	}: PrimitiveAnchorAttributes & {
		variant?: Variant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	{href}
	class={cn(badgeVariants({ variant, className }))}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
