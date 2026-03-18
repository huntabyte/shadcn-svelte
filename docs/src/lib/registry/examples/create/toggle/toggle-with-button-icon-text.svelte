<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Button Icon + Text">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<Button size="sm" variant="outline">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
					data-icon="inline-start"
				/>
				Button
			</Button>
			<Toggle variant="outline" aria-label="Toggle sm icon text" size="sm">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
				Toggle
			</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button size="default" variant="outline">
				<IconPlaceholder
					lucide="ItalicIcon"
					tabler="IconItalic"
					hugeicons="TextItalicIcon"
					phosphor="TextItalicIcon"
					remixicon="RiItalic"
					data-icon="inline-start"
				/>
				Button
			</Button>
			<Toggle variant="outline" aria-label="Toggle default icon text" size="default">
				<IconPlaceholder
					lucide="ItalicIcon"
					tabler="IconItalic"
					hugeicons="TextItalicIcon"
					phosphor="TextItalicIcon"
					remixicon="RiItalic"
				/>
				Toggle
			</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button size="lg" variant="outline">
				<IconPlaceholder
					lucide="UnderlineIcon"
					tabler="IconUnderline"
					hugeicons="TextUnderlineIcon"
					phosphor="TextUnderlineIcon"
					remixicon="RiUnderline"
					data-icon="inline-start"
				/>
				Button
			</Button>
			<Toggle variant="outline" aria-label="Toggle lg icon text" size="lg">
				<IconPlaceholder
					lucide="UnderlineIcon"
					tabler="IconUnderline"
					hugeicons="TextUnderlineIcon"
					phosphor="TextUnderlineIcon"
					remixicon="RiUnderline"
				/>
				Toggle
			</Toggle>
		</div>
	</div>
</Example>
