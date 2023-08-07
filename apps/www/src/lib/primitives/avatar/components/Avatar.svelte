<script lang="ts">
	import { ctx } from "../ctx";
	import type { Props } from "../types";
	type $$Props = Props;

	export let delayMs: $$Props["delayMs"] = undefined;
	export let loadingStatus: $$Props["loadingStatus"] = undefined;

	const {
		states: { loadingStatus: localLoadingStatus },
		updateOption
	} = ctx.set({
		src: "",
		delayMs,
		onLoadingStatusChange: ({ next }) => {
			loadingStatus = next;
			return next;
		}
	});

	$: loadingStatus !== undefined && localLoadingStatus.set(loadingStatus);
	$: updateOption("delayMs", delayMs);
</script>

<div {...$$restProps}>
	<slot />
</div>
