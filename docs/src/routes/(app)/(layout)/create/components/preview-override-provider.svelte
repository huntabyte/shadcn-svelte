<script lang="ts">
	import { setupPreviewOverride } from "./preview-override-context.svelte.js";
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();

	setupPreviewOverride();
</script>

{@render children?.()}
