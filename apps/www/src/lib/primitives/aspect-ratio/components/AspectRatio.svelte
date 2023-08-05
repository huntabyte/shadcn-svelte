<script lang="ts">
	import type { Props } from "../types";
	type $$Props = Props;
	export let ratio: $$Props["ratio"] = 1 / 1;
</script>

<div
	style:position="relative"
	style:width="100%"
	style:padding-bottom="{100 / ratio}%"
>
	<div
		style:position="absolute"
		style:top="0"
		style:right="0"
		style:bottom="0"
		style:left="0"
		{...$$restProps}
	>
		<slot />
	</div>
</div>
