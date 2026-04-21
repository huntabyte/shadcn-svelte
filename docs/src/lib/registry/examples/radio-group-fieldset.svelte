<script lang="ts">
	import {
		FieldSet,
		FieldLegend,
		FieldDescription,
		Field,
		FieldLabel,
	} from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
</script>

<FieldSet class="w-full max-w-xs">
	<FieldLegend variant="label">Subscription Plan</FieldLegend>
	<FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
	<RadioGroup.Root value="monthly">
		<Field orientation="horizontal">
			<RadioGroup.Item value="monthly" id="plan-monthly" />
			<FieldLabel for="plan-monthly" class="font-normal">Monthly ($9.99/month)</FieldLabel>
		</Field>
		<Field orientation="horizontal">
			<RadioGroup.Item value="yearly" id="plan-yearly" />
			<FieldLabel for="plan-yearly" class="font-normal">Yearly ($99.99/year)</FieldLabel>
		</Field>
		<Field orientation="horizontal">
			<RadioGroup.Item value="lifetime" id="plan-lifetime" />
			<FieldLabel for="plan-lifetime" class="font-normal">Lifetime ($299.99)</FieldLabel>
		</Field>
	</RadioGroup.Root>
</FieldSet>
