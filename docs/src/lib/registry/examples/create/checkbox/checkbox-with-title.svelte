<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="With Title">
	<Field.Group>
		<Field.Label for="toggle-2">
			<Field.Field orientation="horizontal">
				<Checkbox.Root id="toggle-2" checked />
				<Field.Content>
					<Field.Title>Enable notifications</Field.Title>
					<Field.Description>
						You can enable or disable notifications at any time.
					</Field.Description>
				</Field.Content>
			</Field.Field>
		</Field.Label>
		<Field.Label for="toggle-4">
			<Field.Field orientation="horizontal" data-disabled>
				<Checkbox.Root id="toggle-4" disabled />
				<Field.Content>
					<Field.Title>Enable notifications</Field.Title>
					<Field.Description>
						You can enable or disable notifications at any time.
					</Field.Description>
				</Field.Content>
			</Field.Field>
		</Field.Label>
	</Field.Group>
</Example>
