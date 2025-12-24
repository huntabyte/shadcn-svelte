<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Vertical Outline With Icons">
	<ToggleGroup.Root variant="outline" type="multiple" orientation="vertical" size="sm">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<IconPlaceholder
				lucide="BoldIcon"
				tabler="IconBold"
				hugeicons="TextBoldIcon"
				phosphor="TextBIcon"
			/>
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<IconPlaceholder
				lucide="ItalicIcon"
				tabler="IconItalic"
				hugeicons="TextItalicIcon"
				phosphor="TextItalicIcon"
			/>
		</ToggleGroup.Item>
		<ToggleGroup.Item value="underline" aria-label="Toggle underline">
			<IconPlaceholder
				lucide="UnderlineIcon"
				tabler="IconUnderline"
				hugeicons="TextUnderlineIcon"
				phosphor="TextUnderlineIcon"
			/>
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
