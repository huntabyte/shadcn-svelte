<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let { children } = $props();
</script>

<ModeWatcher />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
