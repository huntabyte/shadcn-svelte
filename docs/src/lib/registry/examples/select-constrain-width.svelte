<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const models = [
		{
			value: "gpt-4o",
			name: "GPT-4o",
			description:
				"Most capable model for complex tasks. Best for nuanced understanding and creative content.",
		},
		{
			value: "gpt-4o-mini",
			name: "GPT-4o Mini",
			description:
				"Fast and cost-effective for straightforward tasks. Good balance of speed and quality.",
		},
	];

	let value = $state("");

	const triggerContent = $derived(
		models.find((m) => m.value === value)?.name ?? "Select a model"
	);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-[300px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content class="max-w-min">
		{#each models as model (model.value)}
			<Select.Item value={model.value} label={model.name}>
				<div class="flex flex-col gap-1">
					<span class="font-medium">{model.name}</span>
					<span class="text-muted-foreground text-sm">
						{model.description}
					</span>
				</div>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
