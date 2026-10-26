<script lang="ts">
	import * as Tooltip from "#lib/registry/ui/tooltip/index.js";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
