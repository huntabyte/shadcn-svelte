<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Button Icon">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<Button variant="outline" size="icon-sm">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Button>
			<Toggle variant="outline" aria-label="Toggle sm icon" size="sm">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="ItalicIcon"
					tabler="IconItalic"
					hugeicons="TextItalicIcon"
					phosphor="TextItalicIcon"
					remixicon="RiItalic"
				/>
			</Button>
			<Toggle variant="outline" aria-label="Toggle default icon" size="default">
				<IconPlaceholder
					lucide="ItalicIcon"
					tabler="IconItalic"
					hugeicons="TextItalicIcon"
					phosphor="TextItalicIcon"
					remixicon="RiItalic"
				/>
			</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="icon-lg">
				<IconPlaceholder
					lucide="UnderlineIcon"
					tabler="IconUnderline"
					hugeicons="TextUnderlineIcon"
					phosphor="TextUnderlineIcon"
					remixicon="RiUnderline"
				/>
			</Button>
			<Toggle variant="outline" aria-label="Toggle lg icon" size="lg">
				<IconPlaceholder
					lucide="UnderlineIcon"
					tabler="IconUnderline"
					hugeicons="TextUnderlineIcon"
					phosphor="TextUnderlineIcon"
					remixicon="RiUnderline"
				/>
			</Toggle>
		</div>
	</div>
</Example>
