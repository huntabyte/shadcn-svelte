<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import GripVerticalIcon from "@tabler/icons-svelte/icons/grip-vertical";
	import type { Attachment } from "svelte/attachments";

	let { attach }: { attach?: Attachment } = $props();
</script>

<Button
	{@attach attach}
	variant="ghost"
	size="icon"
	class="text-muted-foreground size-7 hover:bg-transparent"
>
	<GripVerticalIcon class="text-muted-foreground size-3" />
	<span class="sr-only">Drag to reorder</span>
</Button>
