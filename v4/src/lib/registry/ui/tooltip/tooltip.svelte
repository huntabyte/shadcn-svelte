<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";
	import TooltipProvider from "./tooltip-provider.svelte";

	let { children, open = $bindable(false), ...restProps }: TooltipPrimitive.RootProps = $props();
</script>

<TooltipProvider>
	<TooltipPrimitive.Root bind:open {...restProps}>
		{@render children?.()}
	</TooltipPrimitive.Root>
</TooltipProvider>
