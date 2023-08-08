<script lang="ts">
	import { Avatar as AvatarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AvatarPrimitive.ImageProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let src: $$Props["src"] = undefined;
	export let alt: $$Props["alt"] = undefined;
</script>

<AvatarPrimitive.Image
	{src}
	{alt}
	class={cn("aspect-square h-full w-full", className)}
	{...$$restProps}
/>
