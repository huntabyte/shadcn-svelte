<script lang="ts">
	import type { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	let {
		checked = false,
		onCheckedChange = (v) => (checked = v),
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {...restProps} />
