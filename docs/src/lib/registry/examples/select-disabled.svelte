<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
</script>

<Select.Root type="single" disabled>
	<Select.Trigger class="w-full max-w-48">Select a fruit</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Item value="apple" label="Apple">Apple</Select.Item>
			<Select.Item value="banana" label="Banana">Banana</Select.Item>
			<Select.Item value="blueberry" label="Blueberry">Blueberry</Select.Item>
			<Select.Item value="grapes" label="Grapes" disabled>Grapes</Select.Item>
			<Select.Item value="pineapple" label="Pineapple">Pineapple</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
