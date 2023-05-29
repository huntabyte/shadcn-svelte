<script lang="ts">
	import type { RadioGroupRootProps } from "radix-svelte";
	import { RadioGroup as RadioGroupPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: RadioGroupRootProps["value"] = undefined;
</script>

<RadioGroupPrimitive.Root
	bind:value
	class={cn("grid gap-2", className)}
	{...$$restProps}
>
	<slot />
</RadioGroupPrimitive.Root>
