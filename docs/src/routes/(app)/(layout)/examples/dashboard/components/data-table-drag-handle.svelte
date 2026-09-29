<script lang="ts">
	import GripVerticalIcon from "@tabler/icons-svelte/icons/grip-vertical";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { Attachment } from "svelte/attachments";

	let { attach }: { attach?: Attachment } = $props();
</script>

<Button
	{@attach attach}
	variant="ghost"
	size="icon"
	class="size-7 text-muted-foreground hover:bg-transparent"
>
	<GripVerticalIcon class="size-3 text-muted-foreground" />
	<span class="sr-only">Drag to reorder</span>
</Button>
