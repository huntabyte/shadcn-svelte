<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<Example title="With Native Select">
	<div class="flex w-full gap-2">
		<Input.Root type="tel" placeholder="(555) 123-4567" class="flex-1" />
		<NativeSelect.Root value="+1">
			<NativeSelect.Option value="+1">+1</NativeSelect.Option>
			<NativeSelect.Option value="+44">+44</NativeSelect.Option>
			<NativeSelect.Option value="+46">+46</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Example>
