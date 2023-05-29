<script lang="ts">
	import type { RadioGroupItemProps } from "radix-svelte";
	import { Circle } from "lucide-svelte";
	import { RadioGroup as RadioGroupPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: RadioGroupItemProps["value"] = "";
</script>

<RadioGroupPrimitive.Item
	{value}
	class={cn(
		"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...$$restProps}
>
	<RadioGroupPrimitive.Indicator class="flex items-center justify-center">
		<Circle class="h-2.5 w-2.5 fill-current text-current" />
	</RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>
