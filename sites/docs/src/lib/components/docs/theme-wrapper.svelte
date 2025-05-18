<script lang="ts">
	import { ConfigContext } from "$lib/config-state.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	const config = ConfigContext.get();

	let {
		class: className,
		defaultTheme,
		children,
		...restProps
	}: PrimitiveDivAttributes & { defaultTheme?: string } = $props();
</script>

<div
	class={cn(`theme-${defaultTheme || config.current.theme}`, "w-full", className)}
	data-style="default"
	style="--radius: {defaultTheme ? 0.5 : config.current.radius}rem"
	{...restProps}
>
	{@render children?.()}
</div>
