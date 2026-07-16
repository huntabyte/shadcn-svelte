<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	let value = $state("");

	const triggerContent = $derived(
		[
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "blueberry", label: "Blueberry" },
			{ value: "carrot", label: "Carrot" },
			{ value: "broccoli", label: "Broccoli" },
			{ value: "spinach", label: "Spinach" },
		].find((i) => i.value === value)?.label ?? "Select a fruit"
	);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-full max-w-48">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			<Select.Item value="apple" label="Apple">Apple</Select.Item>
			<Select.Item value="banana" label="Banana">Banana</Select.Item>
			<Select.Item value="blueberry" label="Blueberry">Blueberry</Select.Item>
		</Select.Group>
		<Select.Separator />
		<Select.Group>
			<Select.Label>Vegetables</Select.Label>
			<Select.Item value="carrot" label="Carrot">Carrot</Select.Item>
			<Select.Item value="broccoli" label="Broccoli">Broccoli</Select.Item>
			<Select.Item value="spinach" label="Spinach">Spinach</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
