<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		class: className,
		defaultTheme,
		children,
		...restProps
	}: PrimitiveDivAttributes & { defaultTheme?: string } = $props();
</script>

<div
	class={cn(`theme-${defaultTheme || $config.theme}`, "w-full", className)}
	data-style={$config.style}
	style="--radius: {defaultTheme ? 0.5 : $config.radius}rem"
	{...restProps}
>
	{@render children?.()}
</div>
