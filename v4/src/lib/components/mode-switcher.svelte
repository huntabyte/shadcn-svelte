<script lang="ts">
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";
	import { mode, toggleMode } from "mode-watcher";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button variant="outline" size="icon" class="group/toggle size-8" onclick={toggleMode}>
	{#if mode.current === "dark"}
		<SunIcon />
	{:else}
		<MoonIcon />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
