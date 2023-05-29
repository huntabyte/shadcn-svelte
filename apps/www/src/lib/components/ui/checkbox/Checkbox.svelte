<script lang="ts">
	import type { CheckboxRootProps } from "radix-svelte";
	import { Check } from "lucide-svelte";
	import { Checkbox as CheckboxPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let checked: CheckboxRootProps["checked"] = undefined;
</script>

<CheckboxPrimitive.Root
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	bind:checked
	{...$$restProps}
>
	<CheckboxPrimitive.Indicator
		class={cn("flex items-center justify-center text-current")}
	>
		<Check class="h-4 w-4" />
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
