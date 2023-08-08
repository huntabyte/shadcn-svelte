<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = RadioGroupPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"] = undefined;
</script>

<RadioGroupPrimitive.Root
	bind:value
	class={cn("grid gap-2", className)}
	{...$$restProps}
>
	<slot />
</RadioGroupPrimitive.Root>
