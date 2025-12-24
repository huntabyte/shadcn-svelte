<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Invalid">
	<Field.Set>
		<Field.Legend>Notification Preferences</Field.Legend>
		<Field.Description>Choose how you want to receive notifications.</Field.Description>
		<RadioGroup.Root value="email">
			<Field.Field orientation="horizontal" data-invalid>
				<RadioGroup.Item value="email" id="invalid-email" aria-invalid />
				<Field.Label for="invalid-email" class="font-normal">Email only</Field.Label>
			</Field.Field>
			<Field.Field orientation="horizontal" data-invalid>
				<RadioGroup.Item value="sms" id="invalid-sms" aria-invalid />
				<Field.Label for="invalid-sms" class="font-normal">SMS only</Field.Label>
			</Field.Field>
			<Field.Field orientation="horizontal" data-invalid>
				<RadioGroup.Item value="both" id="invalid-both" aria-invalid />
				<Field.Label for="invalid-both" class="font-normal">Both Email & SMS</Field.Label>
			</Field.Field>
		</RadioGroup.Root>
	</Field.Set>
</Example>
