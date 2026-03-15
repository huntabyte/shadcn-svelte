<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	let plan = $state("startup");
</script>

<RadioGroup.Root bind:value={plan} class="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
	{#each [{ value: "free", title: "Free", price: "$0", description: "For individuals" }, { value: "startup", title: "Startup", price: "$9", description: "For small teams" }, { value: "enterprise", title: "Enterprise", price: "$29", description: "For large orgs" }] as option (option.value)}
		<Label
			for={option.value}
			class="hover:bg-accent [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col gap-1 rounded-lg border p-4"
		>
			<div class="flex items-center justify-between">
				<RadioGroup.Item value={option.value} id={option.value} />
				<span class="font-semibold"
					>{option.price}<span class="text-muted-foreground text-xs font-normal">/mo</span
					></span
				>
			</div>
			<span class="font-medium">{option.title}</span>
			<span class="text-muted-foreground text-xs">{option.description}</span>
		</Label>
	{/each}
</RadioGroup.Root>
