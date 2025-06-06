<script lang="ts">
	import BoldIcon from "@lucide/svelte/icons/bold";
	import ItalicIcon from "@lucide/svelte/icons/italic";
	import UnderlineIcon from "@lucide/svelte/icons/underline";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root variant="outline" type="multiple">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<BoldIcon className="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<ItalicIcon className="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<UnderlineIcon className="h-4 w-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
