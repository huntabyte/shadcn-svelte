<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";

	let { children } = $props();
</script>

<ModeWatcher />
<DesignSystemProvider>
	{@render children()}
</DesignSystemProvider>
