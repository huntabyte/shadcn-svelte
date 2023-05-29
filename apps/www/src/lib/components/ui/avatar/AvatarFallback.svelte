<script lang="ts">
	import { Avatar as AvatarPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AvatarPrimitive.Fallback
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full bg-muted",
		className
	)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Fallback>
