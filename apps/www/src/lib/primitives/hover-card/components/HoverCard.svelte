<script lang="ts">
	import { ctx } from "../ctx";
	import type { Props } from "../types";
	type $$Props = Props;

	export let positioning: $$Props["positioning"] = undefined;
	export let open: $$Props["open"] = undefined;
	export let openDelay: $$Props["openDelay"] = undefined;
	export let closeDelay: $$Props["closeDelay"] = undefined;
	export let closeOnOutsideClick: $$Props["closeOnOutsideClick"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let arrowSize: $$Props["arrowSize"] = undefined;
	export let portal: $$Props["portal"] = undefined;

	const {
		states: { open: localOpen },
		updateOption
	} = ctx.set({
		defaultOpen: open,
		positioning,
		openDelay,
		closeDelay,
		closeOnOutsideClick,
		closeOnEscape,
		arrowSize,
		portal
	});

	$: open !== undefined && localOpen.set(open);
	$: updateOption("positioning", positioning);
	$: updateOption("openDelay", openDelay);
	$: updateOption("closeDelay", closeDelay);
	$: updateOption("closeOnOutsideClick", closeOnOutsideClick);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("arrowSize", arrowSize);
	$: updateOption("portal", portal);
</script>

<slot />
