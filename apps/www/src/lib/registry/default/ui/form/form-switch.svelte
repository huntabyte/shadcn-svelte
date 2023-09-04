<script lang="ts">
	import { getFormField } from "formsnap";
	import type { Switch as SwitchPrimitive } from "bits-ui";
	import { Switch } from "@/registry/default/ui/switch";
	type $$Props = SwitchPrimitive.Props;

	const { name, setValue, attrStore, value } = getFormField();
	const { name: nameAttr, value: valueAttr, ...rest } = $attrStore;
</script>

<Switch
	{...rest}
	checked={typeof $value === "boolean" ? $value : false}
	onCheckedChange={setValue}
	{...$$restProps}
/>
<input hidden {name} value={$value} />
