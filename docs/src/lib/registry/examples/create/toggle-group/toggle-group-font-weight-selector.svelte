<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let fontWeight = $state("normal");
</script>

<Example title="Font Weight Selector">
	<Field.Field>
		<Field.Label>Font Weight</Field.Label>
		<ToggleGroup.Root
			type="single"
			bind:value={fontWeight}
			variant="outline"
			spacing={2}
			size="lg"
		>
			<ToggleGroup.Item
				value="light"
				aria-label="Light"
				class="flex size-16 flex-col items-center justify-center rounded-xl"
			>
				<span class="text-2xl leading-none font-light">Aa</span>
				<span class="text-muted-foreground text-xs">Light</span>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="normal"
				aria-label="Normal"
				class="flex size-16 flex-col items-center justify-center rounded-xl"
			>
				<span class="text-2xl leading-none font-normal">Aa</span>
				<span class="text-muted-foreground text-xs">Normal</span>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="medium"
				aria-label="Medium"
				class="flex size-16 flex-col items-center justify-center rounded-xl"
			>
				<span class="text-2xl leading-none font-medium">Aa</span>
				<span class="text-muted-foreground text-xs">Medium</span>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="bold"
				aria-label="Bold"
				class="flex size-16 flex-col items-center justify-center rounded-xl"
			>
				<span class="text-2xl leading-none font-bold">Aa</span>
				<span class="text-muted-foreground text-xs">Bold</span>
			</ToggleGroup.Item>
		</ToggleGroup.Root>
		<Field.Description>
			Use
			<code class="bg-muted rounded-md px-1 py-0.5 font-mono">font-{fontWeight}</code>
			to set the font weight.
		</Field.Description>
	</Field.Field>
</Example>
