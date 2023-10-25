<script lang="ts">
	import { Form as FormPrimitive } from "formsnap";
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLSpanElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</FormPrimitive.Description>
