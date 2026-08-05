<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<h2 class={cn("text-lg font-semibold tracking-tight", className)}>{@render children?.()}</h2>
