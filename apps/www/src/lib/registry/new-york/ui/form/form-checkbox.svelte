<script lang="ts">
	import { getFormField } from "formsnap";
	import type { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	export let onCheckedChange: $$Props["onCheckedChange"] = undefined;

	const { name, setValue, attrStore, value } = getFormField();
	const { name: nameAttr, value: valueAttr, ...rest } = $attrStore;
</script>

<Checkbox
	{...rest}
	checked={typeof $value === "boolean" ? $value : false}
	onCheckedChange={(v) => {
		onCheckedChange?.(v);
		setValue(v);
	}}
	{...$$restProps}
	on:click
	on:keydown
/>
<input hidden {name} value={$value} />
