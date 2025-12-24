<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Outline">
	<div class="flex flex-wrap items-center gap-2">
		<Toggle variant="outline" aria-label="Toggle italic">
			<IconPlaceholder
				lucide="ItalicIcon"
				tabler="IconItalic"
				hugeicons="TextItalicIcon"
				phosphor="TextItalicIcon"
			/>
			Italic
		</Toggle>
		<Toggle variant="outline" aria-label="Toggle bold">
			<IconPlaceholder
				lucide="BoldIcon"
				tabler="IconBold"
				hugeicons="TextBoldIcon"
				phosphor="TextBIcon"
			/>
			Bold
		</Toggle>
	</div>
</Example>
