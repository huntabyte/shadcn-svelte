<script lang="ts">
	import FontBold from "svelte-radix/FontBold.svelte";
	import FontItalic from "svelte-radix/FontItalic.svelte";
	import Underline from "svelte-radix/Underline.svelte";
	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root type="multiple">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<FontBold class="size-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<FontItalic class="size-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<Underline class="size-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
