<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	const weights = [
		{ value: "light", label: "Light", class: "font-light" },
		{ value: "normal", label: "Normal", class: "font-normal" },
		{ value: "medium", label: "Medium", class: "font-medium" },
		{ value: "bold", label: "Bold", class: "font-bold" },
	];

	let fontWeight = $state("normal");
</script>

<Field.Field>
	<Field.Label>Font Weight</Field.Label>
	<ToggleGroup.Root type="single" bind:value={fontWeight} variant="outline" spacing={2} size="lg">
		{#each weights as weight (weight.value)}
			<ToggleGroup.Item
				value={weight.value}
				aria-label={weight.label}
				class="flex size-16 flex-col items-center justify-center rounded-xl"
			>
				<span class="text-2xl leading-none {weight.class}">Aa</span>
				<span class="text-xs text-muted-foreground">{weight.label}</span>
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<Field.Description>
		Use <code class="rounded-md bg-muted px-1 py-0.5 font-mono">font-{fontWeight}</code> to set the font
		weight.
	</Field.Description>
</Field.Field>
