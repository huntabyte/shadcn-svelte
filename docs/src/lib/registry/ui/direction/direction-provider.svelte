<script lang="ts">
	import { BitsConfig } from "bits-ui";
	import type { ComponentProps } from "svelte";

	let {
		dir,
		direction,
		children,
	}: Pick<ComponentProps<typeof BitsConfig>, "dir" | "children"> & {
		direction?: ComponentProps<typeof BitsConfig>["dir"];
	} = $props();
</script>

<BitsConfig dir={direction ?? dir}>
	{@render children?.()}
</BitsConfig>
