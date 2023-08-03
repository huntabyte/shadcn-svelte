<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	type $$Props = HTMLAttributes<HTMLDivElement>;
</script>

<div role="group" {...$$restProps}>
	<slot />
</div>
