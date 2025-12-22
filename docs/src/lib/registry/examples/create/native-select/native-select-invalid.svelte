<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<Example title="Invalid">
	<NativeSelect.Root aria-invalid="true">
		<NativeSelect.Option value="">Error state</NativeSelect.Option>
		<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
		<NativeSelect.Option value="banana">Banana</NativeSelect.Option>
		<NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
	</NativeSelect.Root>
</Example>

