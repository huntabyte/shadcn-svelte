<script lang="ts">
	import * as Select from "@/registry/default/ui/select";
	import type { Select as SelectPrimitive } from "bits-ui";
	import { getFormField } from "formsnap";

	type $$Props = SelectPrimitive.TriggerProps & {
		placeholder?: string;
	};
	type $$Events = SelectPrimitive.TriggerEvents;
	const { attrStore, value } = getFormField();
	export let placeholder = "";
</script>

<Select.Trigger {...$$restProps} {...$attrStore} on:click on:keydown type="button">
	<slot value={$value}>
		<Select.Value {placeholder} />
	</slot>
</Select.Trigger>
