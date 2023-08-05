<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { RadioItemProps } from "./types";

	type $$Props = RadioItemProps;
	export let value: RadioItemProps["value"];
	export let disabled: RadioItemProps["disabled"] = false;
	const radioItem = ctx.getRadioItem(value);
</script>

<div use:melt={$radioItem({ value, disabled })} {...$$restProps}>
	<slot />
</div>
