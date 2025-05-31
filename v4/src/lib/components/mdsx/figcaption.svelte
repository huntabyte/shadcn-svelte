<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getIconForLanguageExtension } from "../icons/icons.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		children,
		"data-language": language,
		...restProps
	}: HTMLAttributes<HTMLElement> = $props();

	const Icon = $derived(
		language && typeof language === "string" ? getIconForLanguageExtension(language) : null
	);
</script>

<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption
	class={cn(
		"text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
		className
	)}
	{...restProps}
>
	{#if Icon}
		<Icon />
	{/if}
	{@render children?.()}
</figcaption>
