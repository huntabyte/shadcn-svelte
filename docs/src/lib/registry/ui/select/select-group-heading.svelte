<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "cn";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.GroupHeading> = $props();
</script>

<!-- parity-ignore: Bits splits Group / GroupHeading where Radix has a single Label; the slot keeps our name -->
<SelectPrimitive.GroupHeading
	bind:ref
	data-slot="select-group-heading"
	class={cn("cn-select-label", className)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
