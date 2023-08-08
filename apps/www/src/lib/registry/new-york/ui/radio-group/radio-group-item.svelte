<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "@huntabyte/primitives";
	import { Check } from "radix-icons-svelte";
	import { cn } from "$lib/utils";

	type $$Props = RadioGroupPrimitive.ItemProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"];
</script>

<RadioGroupPrimitive.Item
	{value}
	class={cn(
		"aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...$$restProps}
>
	<div class="flex items-center justify-center">
		<RadioGroupPrimitive.ItemIndicator>
			<Check class="h-3.5 w-3.5 fill-primary" />
		</RadioGroupPrimitive.ItemIndicator>
	</div>
</RadioGroupPrimitive.Item>
