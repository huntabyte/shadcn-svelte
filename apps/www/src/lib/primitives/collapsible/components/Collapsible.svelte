<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	export let forceVisible: $$Props["forceVisible"] = false;
	export let disabled: $$Props["disabled"] = undefined;
	export let open: $$Props["open"] = undefined;

	const {
		elements: { root },
		states: { open: localOpen },
		updateOption
	} = ctx.set({
		disabled,
		forceVisible,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			return next;
		}
	});

	$: open !== undefined && localOpen.set(open);

	$: updateOption("disabled", disabled);
	$: updateOption("forceVisible", forceVisible);
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
