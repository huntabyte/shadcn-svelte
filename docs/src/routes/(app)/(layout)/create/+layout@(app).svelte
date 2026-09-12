<script lang="ts">
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";
	import CreateLayout from "./create-layout.svelte";
	import "../../../../styles-registry.css";

	let { children } = $props();
</script>

<DesignSystemProvider>
	<CreateLayout {children} />
</DesignSystemProvider>
