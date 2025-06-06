<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { PageProps } from "./$types.js";

	let { data }: PageProps = $props();
</script>

<div class={cn("bg-background")}>
	<data.component />
</div>
