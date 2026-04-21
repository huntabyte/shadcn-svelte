<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
</script>

<Field.Field data-invalid class="w-full max-w-48">
	<Field.Label>Fruit</Field.Label>
	<Select.Root type="single">
		<Select.Trigger aria-invalid>Select a fruit</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Item value="apple" label="Apple">Apple</Select.Item>
				<Select.Item value="banana" label="Banana">Banana</Select.Item>
				<Select.Item value="blueberry" label="Blueberry">Blueberry</Select.Item>
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<Field.Error errors={[{ message: "Please select a fruit." }]} />
</Field.Field>
