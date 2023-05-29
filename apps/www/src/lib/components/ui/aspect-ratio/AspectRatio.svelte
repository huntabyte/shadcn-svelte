<script lang="ts">
	import type { AspectRatioProps } from "radix-svelte";
	import { AspectRatio } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let ratio: AspectRatioProps["ratio"] = 16 / 9;
</script>

<AspectRatio.Root {ratio} class={cn(className)} {...$$restProps}>
	<slot />
</AspectRatio.Root>
