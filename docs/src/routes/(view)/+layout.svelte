<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { onMount } from "svelte";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { syncMenuColor } from "$lib/features/design-system/index.js";
	import { DEFAULT_CONFIG } from "$lib/registry/config.js";

	let { children } = $props();

	onMount(() => syncMenuColor(DEFAULT_CONFIG.menuColor));
</script>

<ModeWatcher />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
