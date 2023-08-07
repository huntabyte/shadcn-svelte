<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ImageProps } from "../types";
	type $$Props = ImageProps;

	export let src: $$Props["src"] = undefined;
	export let alt: $$Props["alt"] = undefined;
	const {
		elements: { image }
	} = ctx.getImage(src);
</script>

<img use:melt={$image} {alt} {...$$restProps} />
