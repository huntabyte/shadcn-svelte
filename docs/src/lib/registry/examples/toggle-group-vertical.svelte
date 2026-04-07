<script lang="ts">
	import BoldIcon from "@lucide/svelte/icons/bold";
	import ItalicIcon from "@lucide/svelte/icons/italic";
	import UnderlineIcon from "@lucide/svelte/icons/underline";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root
	type="multiple"
	orientation="vertical"
	spacing={1}
	value={["bold", "italic"]}
>
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<BoldIcon class="size-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<ItalicIcon class="size-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="underline" aria-label="Toggle underline">
		<UnderlineIcon class="size-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
