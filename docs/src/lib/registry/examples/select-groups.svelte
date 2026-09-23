<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
	];

	const vegetables = [
		{ value: "carrot", label: "Carrot" },
		{ value: "broccoli", label: "Broccoli" },
		{ value: "spinach", label: "Spinach" },
	];

	let value = $state("");
</script>

<Select.Root type="single" items={[...fruits, ...vegetables]} bind:value>
	<Select.Trigger class="w-full max-w-48">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{#each fruits as fruit (fruit.value)}
				<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
			{/each}
		</Select.Group>
		<Select.Separator />
		<Select.Group>
			<Select.Label>Vegetables</Select.Label>
			{#each vegetables as vegetable (vegetable.value)}
				<Select.Item value={vegetable.value} label={vegetable.label}>{vegetable.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
