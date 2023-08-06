<script lang="ts">
	import { ctx } from "../ctx";
	import type { TriggerProps } from "../types";
	import { melt } from "@melt-ui/svelte";
	type $$Props = TriggerProps;

	export let value: $$Props["value"];
	export let disabled: $$Props["disabled"] = undefined;

	const {
		elements: { trigger }
	} = ctx.get();
</script>

<button use:melt={$trigger({ value, disabled })} {...$$restProps}>
	<slot />
</button>
