<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { mode, toggleMode } from "mode-watcher";
	import Sun from "@lucide/svelte/icons/sun";
	import Moon from "@lucide/svelte/icons/moon";
</script>

<Button variant="secondary" size="icon" class="group/toggle size-8" onclick={toggleMode}>
	{#if mode.current === "dark"}
		<Sun class="hidden [html.dark_&]:block" />
	{:else}
		<Moon class="hidden [html.light_&]:block" />
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
