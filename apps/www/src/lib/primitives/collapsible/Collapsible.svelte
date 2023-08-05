<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { Props } from "./types";

	type $$Props = Props;
	export let disabled: Props["disabled"] = undefined;
	export let defaultOpen: Props["defaultOpen"] = undefined;
	export let open: Props["open"] = undefined;
	export let onOpenChange: Props["onOpenChange"] = undefined;

	const root = ctx.set({
		disabled,
		defaultOpen,
		open,
		onOpenChange
	});
</script>

<div use:melt={$root} {...$$restProps}>
	<slot />
</div>
