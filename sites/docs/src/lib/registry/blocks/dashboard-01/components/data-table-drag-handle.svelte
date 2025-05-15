<script lang="ts">
	import { useSortable } from "@dnd-kit-svelte/sortable";
	import { Button } from "$lib/registry/ui/button/index.js";
	import GripVerticalIcon from "@tabler/icons-svelte/icons/grip-vertical";

	let { id }: { id: number } = $props();

	const { attributes, listeners } = useSortable({ id: () => id });
</script>

<Button
	{...attributes.current}
	{...listeners.current}
	variant="ghost"
	size="icon"
	class="text-muted-foreground size-7 hover:bg-transparent"
>
	<GripVerticalIcon class="text-muted-foreground size-3" />
	<span class="sr-only">Drag to reorder</span>
</Button>
