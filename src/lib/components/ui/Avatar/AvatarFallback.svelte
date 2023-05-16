<script lang="ts">
	import { Avatar } from "radix-svelte";
	import { cn } from "$lib/utils";
	import type { AvatarFallbackProps } from "radix-svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let delayMs: AvatarFallbackProps["delayMs"] = 0;
</script>

<Avatar.Fallback
	{delayMs}
	class={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
	{...$$restProps}
>
	<slot />
</Avatar.Fallback>
