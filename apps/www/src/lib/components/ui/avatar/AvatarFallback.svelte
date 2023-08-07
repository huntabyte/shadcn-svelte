<script lang="ts">
	import { Avatar as AvatarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AvatarPrimitive.FallbackProps;
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
