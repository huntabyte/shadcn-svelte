<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SelectPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SelectPrimitive.Content
	class={cn(
		"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 translate-y-1",
		className
	)}
	{...$$restProps}
>
	<slot />
</SelectPrimitive.Content>
