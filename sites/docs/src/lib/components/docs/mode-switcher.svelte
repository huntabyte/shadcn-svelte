<script lang="ts">
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { mode, toggleMode } from "mode-watcher";
</script>

<Button variant="ghost" class="group/toggle size-8 px-0" onclick={toggleMode}>
	{#if mode.current === "dark"}
		<SunIcon />
	{:else}
		<MoonIcon />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
