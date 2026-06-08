<script lang="ts" generics="P = never">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: TooltipPrimitive.RootProps<P> = $props();
</script>

<TooltipPrimitive.Root bind:open {...restProps} />
