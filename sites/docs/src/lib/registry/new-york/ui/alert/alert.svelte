<script lang="ts">
	import { type AlertVariant, alertVariants } from "./index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant,
		children,
		...restProps
	}: PrimitiveDivAttributes & {
		variant?: AlertVariant;
	} = $props();
</script>

<div bind:this={ref} class={cn(alertVariants({ variant }), className)} {...restProps} role="alert">
	{@render children?.()}
</div>
