<script lang="ts">
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Sizes">
	<div class="flex flex-col gap-4">
		<NativeSelect.Root size="sm">
			<NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
			<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
			<NativeSelect.Option value="banana">Banana</NativeSelect.Option>
			<NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
		</NativeSelect.Root>
		<NativeSelect.Root size="default">
			<NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
			<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
			<NativeSelect.Option value="banana">Banana</NativeSelect.Option>
			<NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Example>
