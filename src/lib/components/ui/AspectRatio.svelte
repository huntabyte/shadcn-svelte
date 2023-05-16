<script lang="ts">
	import { AspectRatio, type AspectRatioProps } from "radix-svelte";

	export let ratio: AspectRatioProps["ratio"] = 16 / 9;
</script>

<AspectRatio.Root {ratio}>
	<slot />
</AspectRatio.Root>
