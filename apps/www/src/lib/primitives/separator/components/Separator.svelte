<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	export let orientation: $$Props["orientation"] = "horizontal";
	export let decorative: $$Props["decorative"] = true;

	const {
		elements: { root },
		updateOption
	} = ctx.get({ orientation, decorative });

	$: updateOption("orientation", orientation);
	$: updateOption("decorative", decorative);
</script>

<div use:melt={$root} {...$$restProps} />
