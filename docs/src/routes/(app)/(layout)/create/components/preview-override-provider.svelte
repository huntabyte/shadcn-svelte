<script lang="ts">
	import type { Snippet } from "svelte";
	import { setupPreviewOverride } from "./preview-override-context.svelte.js";

	let { children }: { children: Snippet } = $props();

	setupPreviewOverride();
</script>

{@render children?.()}
