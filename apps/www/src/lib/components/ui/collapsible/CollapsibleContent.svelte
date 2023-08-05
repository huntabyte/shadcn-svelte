<script lang="ts">
	import * as CollapsiblePrimitive from "$primitives/collapsible";
	import { slide } from "svelte/transition";
	type $$Props = CollapsiblePrimitive.ContentProps;
</script>

<CollapsiblePrimitive.Content transition={slide} {...$$restProps}>
	<slot />
</CollapsiblePrimitive.Content>
