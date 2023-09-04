<script lang="ts">
	import * as Select from "@/registry/default/ui/select";
	import { getFormField } from "formsnap";
	import type { Select as SelectPrimitive } from "bits-ui";

	type $$Props = SelectPrimitive.Props;
	const { setValue, name, value } = getFormField();
	export let onSelectedChange: $$Props["onSelectedChange"];
</script>

<Select.Root
	onSelectedChange={(v) => {
		onSelectedChange?.(v);
		setValue(v ? v.value : undefined);
	}}
	{...$$restProps}
>
	<slot />
	<input hidden {name} value={$value} />
</Select.Root>
