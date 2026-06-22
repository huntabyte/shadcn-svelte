<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: ComboboxPrimitive.TriggerProps = $props();
</script>

<ComboboxPrimitive.Trigger bind:ref data-slot="combobox-trigger" {...restProps} />
