<script lang="ts">
	import { FontBold, FontItalic, Underline } from "radix-icons-svelte";
	import * as ToggleGroup from "@/registry/new-york/ui/toggle-group";
</script>

<ToggleGroup.Root size="sm" type="multiple">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<FontBold class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<FontItalic class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<Underline class="h-4 w-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
