<script lang="ts">
	import { Avatar } from "radix-svelte";
	import { cn } from "$lib/utils";
	import type { AvatarImageProps } from "radix-svelte";

	let className: string | undefined | null = undefined;
	export let src: AvatarImageProps["src"] = undefined;
	export let alt: AvatarImageProps["alt"] = undefined;
	export { className as class };
</script>

<Avatar.Image {alt} {src} class={cn("aspect-square h-full w-full", className)} {...$$restProps} />
