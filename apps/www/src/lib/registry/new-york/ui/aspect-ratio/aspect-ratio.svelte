<script lang="ts">
	import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

	let {
		ratio = 4 / 3,
		ref = $bindable(null),
		...restProps
	}: AspectRatioPrimitive.Props = $props();
</script>

<AspectRatioPrimitive.Root bind:ref {ratio} {...restProps} />
