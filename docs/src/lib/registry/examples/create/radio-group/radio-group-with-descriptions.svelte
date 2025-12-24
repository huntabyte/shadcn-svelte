<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With Descriptions">
	<RadioGroup.Root value="plus">
		<Field.Label for="plus-plan">
			<Field.Field orientation="horizontal">
				<Field.Content>
					<div class="font-medium">Plus</div>
					<Field.Description>For individuals and small teams</Field.Description>
				</Field.Content>
				<RadioGroup.Item value="plus" id="plus-plan" />
			</Field.Field>
		</Field.Label>
		<Field.Label for="pro-plan">
			<Field.Field orientation="horizontal">
				<Field.Content>
					<div class="font-medium">Pro</div>
					<Field.Description>For growing businesses</Field.Description>
				</Field.Content>
				<RadioGroup.Item value="pro" id="pro-plan" />
			</Field.Field>
		</Field.Label>
		<Field.Label for="enterprise-plan">
			<Field.Field orientation="horizontal">
				<Field.Content>
					<div class="font-medium">Enterprise</div>
					<Field.Description>For large teams and enterprises</Field.Description>
				</Field.Content>
				<RadioGroup.Item value="enterprise" id="enterprise-plan" />
			</Field.Field>
		</Field.Label>
	</RadioGroup.Root>
</Example>
