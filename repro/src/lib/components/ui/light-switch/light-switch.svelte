<script lang="ts">
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { LightSwitchProps } from "./types";

	let { variant = "outline" }: LightSwitchProps = $props();
</script>

<Button onclick={toggleMode} {variant} size="icon">
	<SunIcon class="rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0" />
	<MoonIcon class="absolute rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Toggle theme</span>
</Button>
