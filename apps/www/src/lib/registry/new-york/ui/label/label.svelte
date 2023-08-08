<script lang="ts">
	import { Label as LabelPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = LabelPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className
	)}
	{...$$restProps}
>
	<slot />
</LabelPrimitive.Root>
