<script lang="ts">
	import type { Checkbox as CheckboxPrimitive, WithoutChildrenOrChild } from "bits-ui";
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

	let {
		checked = false,
		onCheckedChange = (v) => (checked = v),
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {...restProps} />
