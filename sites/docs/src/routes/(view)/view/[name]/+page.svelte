<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { PageData } from "./$types.js";

	let { data }: { data: PageData } = $props();
</script>

<div class={cn("themes-wrapper bg-background", data.block?.container?.className)}>
	<data.block.component />
</div>
