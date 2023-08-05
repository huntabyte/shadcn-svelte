<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { RadioGroupProps } from "../types";

	type $$Props = RadioGroupProps;
	const { radioGroup } = ctx.setRadioGroup($$restProps);
</script>

<div use:melt={$radioGroup} {...$$restProps}>
	<slot />
</div>
