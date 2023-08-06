<script lang="ts">
	import { ctx } from "../ctx";
	import type { Props } from "../types";
	type $$Props = Props;

	export let positioning: $$Props["positioning"] = undefined;
	export let arrowSize: $$Props["arrowSize"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let portal: $$Props["portal"] = undefined;
	export let closeOnPointerDown: $$Props["closeOnPointerDown"] = undefined;
	export let openDelay: $$Props["openDelay"] = undefined;
	export let closeDelay: $$Props["closeDelay"] = undefined;
	export let open: $$Props["open"] = undefined;

	const {
		states: { open: localOpen },
		updateOption
	} = ctx.set({
		positioning,
		arrowSize,
		closeOnEscape,
		portal,
		closeOnPointerDown,
		openDelay,
		closeDelay,
		defaultOpen: open
	});

	$: open !== undefined && localOpen.set(open);
	$: updateOption("positioning", positioning);
	$: updateOption("arrowSize", arrowSize);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("portal", portal);
	$: updateOption("closeOnPointerDown", closeOnPointerDown);
	$: updateOption("openDelay", openDelay);
	$: updateOption("closeDelay", closeDelay);
</script>

<slot />
