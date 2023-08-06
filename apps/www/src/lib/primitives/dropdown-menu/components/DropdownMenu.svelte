<script lang="ts">
	import type { Props } from "../types";
	import { ctx } from "../ctx";
	type $$Props = Props;

	export let closeOnOutsideClick: $$Props["closeOnOutsideClick"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let portal: $$Props["portal"] = undefined;
	export let forceVisible: $$Props["forceVisible"] = undefined;
	export let open: $$Props["open"] = undefined;
	export let preventScroll: $$Props["preventScroll"] = undefined;
	export let arrowSize: $$Props["arrowSize"] = undefined;
	export let positioning: $$Props["positioning"] = undefined;
	export let loop: $$Props["loop"] = undefined;
	export let dir: $$Props["dir"] = undefined;

	const {
		states: { open: localOpen },
		updateOption
	} = ctx.set({
		closeOnOutsideClick,
		closeOnEscape,
		portal,
		forceVisible,
		defaultOpen: open,
		preventScroll,
		arrowSize,
		positioning,
		loop,
		dir,
		onOpenChange: ({ next }) => {
			open = next;
			return next;
		}
	});
	$: open !== undefined && localOpen.set(open);

	$: updateOption("closeOnOutsideClick", closeOnOutsideClick);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("portal", portal);
	$: updateOption("forceVisible", forceVisible);
	$: updateOption("preventScroll", preventScroll);
	$: updateOption("arrowSize", arrowSize);
	$: updateOption("positioning", positioning);
	$: updateOption("loop", loop);
	$: updateOption("dir", dir);
</script>

<slot />
