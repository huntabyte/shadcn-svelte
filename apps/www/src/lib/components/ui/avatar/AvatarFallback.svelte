<script lang="ts">
	import type { AvatarFallbackProps } from "radix-svelte";
	import { Avatar as AvatarPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let delayMs: AvatarFallbackProps["delayMs"] = 0;
</script>

<AvatarPrimitive.Fallback
	{delayMs}
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full bg-muted",
		className
	)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Fallback>
