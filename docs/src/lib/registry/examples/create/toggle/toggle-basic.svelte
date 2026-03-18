<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Basic">
	<div class="flex flex-wrap items-center gap-2">
		<Toggle aria-label="Toggle bold" pressed>
			<IconPlaceholder
				lucide="BoldIcon"
				tabler="IconBold"
				hugeicons="TextBoldIcon"
				phosphor="TextBIcon"
				remixicon="RiBold"
			/>
		</Toggle>
		<Toggle aria-label="Toggle italic">
			<IconPlaceholder
				lucide="ItalicIcon"
				tabler="IconItalic"
				hugeicons="TextItalicIcon"
				phosphor="TextItalicIcon"
				remixicon="RiItalic"
			/>
		</Toggle>
		<Toggle aria-label="Toggle underline">
			<IconPlaceholder
				lucide="UnderlineIcon"
				tabler="IconUnderline"
				hugeicons="TextUnderlineIcon"
				phosphor="TextUnderlineIcon"
				remixicon="RiUnderline"
			/>
		</Toggle>
	</div>
</Example>
