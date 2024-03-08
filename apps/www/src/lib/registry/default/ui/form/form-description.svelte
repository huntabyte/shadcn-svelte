<script lang="ts">
	import * as FormPrimitive from "formsnap";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLSpanElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
