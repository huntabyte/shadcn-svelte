<script lang="ts">
	import type { Props } from "../types";
	import { ctx } from "../ctx";

	type $$Props = Props;
	export let positioning: $$Props["positioning"] = undefined;
	export let arrowSize: $$Props["arrowSize"] = undefined;
	export let disableFocusTrap: $$Props["disableFocusTrap"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let closeOnOutsideClick: $$Props["closeOnOutsideClick"] = undefined;
	export let preventScroll: $$Props["preventScroll"] = undefined;
	export let portal: $$Props["portal"] = undefined;
	export let open: $$Props["open"] = undefined;

	const {
		updateOption,
		states: { open: localOpen }
	} = ctx.set({
		positioning,
		arrowSize,
		disableFocusTrap,
		closeOnEscape,
		closeOnOutsideClick,
		preventScroll,
		portal,
		defaultOpen: open,
		onOpenChange: ({ next }) => {
			open = next;
			return next;
		}
	});

	$: open !== undefined && localOpen.set(open);
	$: updateOption("positioning", positioning);
	$: updateOption("arrowSize", arrowSize);
	$: updateOption("disableFocusTrap", disableFocusTrap);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("closeOnOutsideClick", closeOnOutsideClick);
	$: updateOption("preventScroll", preventScroll);
	$: updateOption("portal", portal);
</script>

<slot />
