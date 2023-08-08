<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from "@huntabyte/primitives";
	import { slide } from "svelte/transition";
	type $$Props = CollapsiblePrimitive.ContentProps;
</script>

<CollapsiblePrimitive.Content transition={slide} {...$$restProps}>
	<slot />
</CollapsiblePrimitive.Content>
