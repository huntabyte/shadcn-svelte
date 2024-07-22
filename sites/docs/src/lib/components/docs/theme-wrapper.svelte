<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import { cn } from "$lib/utils.js";
	export let defaultTheme: string | undefined = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	class={cn(`theme-${defaultTheme || $config.theme}`, "w-full", className)}
	data-style={$config.style}
	style="--radius: {defaultTheme ? 0.5 : $config.radius}rem"
>
	<slot />
</div>
