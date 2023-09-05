<script lang="ts">
	import { getFormField } from "formsnap";
	import type { Switch as SwitchPrimitive } from "bits-ui";
	import { Switch } from "@/registry/new-york/ui/switch";
	type $$Props = SwitchPrimitive.Props;
	type $$Events = SwitchPrimitive.Events;

	export let onCheckedChange: $$Props["onCheckedChange"] = undefined;

	const { name, setValue, attrStore, value } = getFormField();
</script>

<Switch
	{...$attrStore}
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
