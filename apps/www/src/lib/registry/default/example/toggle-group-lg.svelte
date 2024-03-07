<script lang="ts">
	import Bold from "lucide-svelte/icons/bold";
	import Italic from "lucide-svelte/icons/italic";
	import Underline from "lucide-svelte/icons/underline";
	import * as ToggleGroup from "$lib/registry/default/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root size="lg" type="multiple">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<Bold class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<Italic class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<Underline class="h-4 w-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
