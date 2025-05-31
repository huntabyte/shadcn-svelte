<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { mode, toggleMode } from "mode-watcher";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
</script>

<Button variant="secondary" size="icon" class="group/toggle size-8" onclick={toggleMode}>
	{#if mode.current === "dark"}
		<SunIcon />
	{:else}
		<MoonIcon />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
