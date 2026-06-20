<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";

	let { ...restProps }: ComboboxPrimitive.PortalProps = $props();
</script>

<ComboboxPrimitive.Portal {...restProps} />
