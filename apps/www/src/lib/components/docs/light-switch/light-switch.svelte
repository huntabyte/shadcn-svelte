<script lang="ts">
	import { Sun, Moon } from "radix-icons-svelte";
	import { Button } from "@/registry/default/ui/button";

	import { toggleMode, mode } from "mode-watcher";
</script>

<Button
	on:click={toggleMode}
	variant="ghost"
	size="sm"
	role="switch"
	aria-label="Light Switch"
	aria-checked={$mode === "dark"}
	title="Toggle {$mode === 'light' ? 'Dark' : 'Light'} Mode"
	class="h-8 w-9 px-0"
>
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">
		Toggle {$mode === "light" ? "Dark" : "Light"} Mode
	</span>
</Button>
