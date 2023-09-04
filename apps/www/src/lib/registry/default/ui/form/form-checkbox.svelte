<script lang="ts">
	import { getFormField } from "formsnap";
	import type { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { Checkbox } from "@/registry/default/ui/checkbox";
	type $$Props = CheckboxPrimitive.Props;

	const { name, setValue, attrStore, value } = getFormField();
	const { name: nameAttr, value: valueAttr, ...rest } = $attrStore;
</script>

<Checkbox
	{...rest}
	checked={typeof $value === "boolean" ? $value : false}
	onCheckedChange={setValue}
	{...$$restProps}
/>
<input hidden {name} value={$value} />
