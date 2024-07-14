<script lang="ts">
	import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		ratio = 4 / 3,
		...restProps
	}: AspectRatioPrimitive.RootProps = $props();
</script>

<AspectRatioPrimitive.Root bind:ref {ratio} {...restProps} />
