<script lang="ts">
	import { getFormField } from "formsnap";
	import type { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import * as RadioGroup from "@/registry/new-york/ui/radio-group";

	type $$Props = RadioGroupPrimitive.Props;
	const { attrStore, setValue, name, value } = getFormField();

	export let onValueChange: $$Props["onValueChange"] = undefined;
</script>

<RadioGroup.Root
	{...$attrStore}
	onValueChange={(v) => {
		onValueChange?.(v);
		setValue(v);
	}}
	{...$$restProps}
>
	<slot />
	<input hidden {name} value={$value} />
</RadioGroup.Root>
