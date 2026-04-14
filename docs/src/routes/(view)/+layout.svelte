<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let { children } = $props();
</script>

<ModeWatcher />
<Tooltip.Provider>
	<DesignSystemProvider>
		{@render children()}
	</DesignSystemProvider>
</Tooltip.Provider>
