<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group";
	import { Label } from "$lib/registry/ui/label";

	const plans = [
		{
			id: "starter",
			name: "Starter Plan",
			description: "Perfect for small businesses getting started with our platform",
			price: "$10",
		},
		{
			id: "pro",
			name: "Pro Plan",
			description: "Advanced features for growing businesses with higher demands",
			price: "$20",
		},
	] as const;
</script>

<div class="flex flex-col gap-6">
	<RadioGroup.Root value="comfortable">
		<div class="flex items-center gap-3">
			<RadioGroup.Item value="default" id="r1" />
			<Label for="r1">Default</Label>
		</div>
		<div class="flex items-center gap-3">
			<RadioGroup.Item value="comfortable" id="r2" />
			<Label for="r2">Comfortable</Label>
		</div>
		<div class="flex items-center gap-3">
			<RadioGroup.Item value="compact" id="r3" />
			<Label for="r3">Compact</Label>
		</div>
	</RadioGroup.Root>
	<RadioGroup.Root value="starter" class="max-w-sm">
		{#each plans as plan (plan.id)}
			<Label
				class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-green-600 has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:border-green-900 dark:has-[[data-state=checked]]:bg-green-950"
			>
				<RadioGroup.Item
					value={plan.id}
					id={plan.name}
					class="shadow-none data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white"
				/>
				<div class="grid gap-1 font-normal">
					<div class="font-medium">{plan.name}</div>
					<div class="text-muted-foreground leading-snug">
						{plan.description}
					</div>
				</div>
			</Label>
		{/each}
	</RadioGroup.Root>
</div>
