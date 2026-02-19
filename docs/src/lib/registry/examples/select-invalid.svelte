<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
</script>

<div class="flex flex-col gap-2 w-[180px]">
	<Select.Root type="single">
		<Select.Trigger aria-invalid="true" class="aria-[invalid=true]:border-destructive">
			Select a fruit
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="apple" label="Apple">Apple</Select.Item>
			<Select.Item value="banana" label="Banana">Banana</Select.Item>
			<Select.Item value="mango" label="Mango">Mango</Select.Item>
		</Select.Content>
	</Select.Root>
	<p class="text-destructive text-sm">Please select a fruit.</p>
</div>
