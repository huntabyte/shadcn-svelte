<script lang="ts">
	import { cn } from "$lib/utils";
	import { Dialog as DialogPrimitive } from "radix-svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Description>
