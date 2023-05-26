<script lang="ts">
	import { cva } from "class-variance-authority";
	import { Label as LabelPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	const labelVariants = cva(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	);

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root class={cn(labelVariants(), className)} {...$$restProps}>
	<slot />
</LabelPrimitive.Root>
