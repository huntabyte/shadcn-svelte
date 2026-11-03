<script lang="ts">
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";
	import "../../../../styles-registry.css";

	let { children } = $props();
</script>

<DesignSystemProvider applyToDocument={false}>
	{@render children()}
</DesignSystemProvider>
