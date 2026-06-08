<script lang="ts" generics="P = never">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: TooltipPrimitive.TriggerProps<P> = $props();
</script>

<TooltipPrimitive.Trigger bind:ref data-slot="tooltip-trigger" {...restProps} />
