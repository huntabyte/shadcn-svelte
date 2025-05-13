<script lang="ts">
	import Bold from "@lucide/svelte/icons/bold";
	import Italic from "@lucide/svelte/icons/italic";
	import Underline from "@lucide/svelte/icons/underline";
	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root type="single">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<Bold />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<Italic />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<Underline />
	</ToggleGroup.Item>
</ToggleGroup.Root>
