<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: SelectPrimitive.ValueProps = $props();
</script>

<SelectPrimitive.Value bind:ref data-slot="select-value" {...restProps} />
