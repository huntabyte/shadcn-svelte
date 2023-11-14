<script lang="ts">
	import { Bold, Italic, Underline } from "lucide-svelte";
	import * as ToggleGroup from "@/registry/default/ui/toggle-group";
</script>

<ToggleGroup.Root type="single">
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
