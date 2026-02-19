<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
</script>

<Select.Root type="single" disabled>
	<Select.Trigger class="w-[180px]">
		Select a fruit
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="apple" label="Apple">Apple</Select.Item>
		<Select.Item value="banana" label="Banana">Banana</Select.Item>
		<Select.Item value="mango" label="Mango">Mango</Select.Item>
	</Select.Content>
</Select.Root>
