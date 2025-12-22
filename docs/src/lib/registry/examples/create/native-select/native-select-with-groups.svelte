<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<Example title="With Groups">
	<NativeSelect.Root>
		<NativeSelect.Option value="">Select a food</NativeSelect.Option>
		<NativeSelect.OptGroup label="Fruits">
			<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
			<NativeSelect.Option value="banana">Banana</NativeSelect.Option>
			<NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
		</NativeSelect.OptGroup>
		<NativeSelect.OptGroup label="Vegetables">
			<NativeSelect.Option value="carrot">Carrot</NativeSelect.Option>
			<NativeSelect.Option value="broccoli">Broccoli</NativeSelect.Option>
			<NativeSelect.Option value="spinach">Spinach</NativeSelect.Option>
		</NativeSelect.OptGroup>
	</NativeSelect.Root>
</Example>

