<script lang="ts">
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;

	export let preventScroll: $$Props["preventScroll"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let closeOnOutsideClick: $$Props["closeOnOutsideClick"] = undefined;
	export let portal: $$Props["portal"] = undefined;
	export let forceVisible: $$Props["forceVisible"] = undefined;
	export let open: $$Props["open"] = undefined;

	const {
		states: { open: localOpen },
		updateOption
	} = ctx.set({
		preventScroll,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		forceVisible,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			return next;
		}
	});

	$: open !== undefined && localOpen.set(open);

	$: updateOption("preventScroll", preventScroll);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("closeOnOutsideClick", closeOnOutsideClick);
	$: updateOption("portal", portal);
	$: updateOption("forceVisible", forceVisible);
</script>

<slot />
