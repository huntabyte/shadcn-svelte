<script lang="ts">
	import { Checkbox as CheckboxPrimitive, type CheckboxRootProps } from "radix-svelte";
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: CheckboxRootProps["value"] = undefined;
	export let disabled: CheckboxRootProps["disabled"] = undefined;
	export let name: CheckboxRootProps["name"] = undefined;
	export let required: CheckboxRootProps["required"] = undefined;
	export let checked: CheckboxRootProps["checked"] = undefined;
</script>

<CheckboxPrimitive.Root
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	bind:checked
	{value}
	{disabled}
	{name}
	{required}
	{...$$restProps}
>
	<CheckboxPrimitive.Indicator class={cn("flex items-center justify-center text-current")}>
		<Check class="h-4 w-4" />
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
