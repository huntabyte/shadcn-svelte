<script lang="ts">
	import { Form as FormPrimitive } from "formsnap";
	import { buttonVariants } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";
	import { ChevronDown } from "lucide-svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";

	type $$Props = HTMLSelectAttributes;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Select
	class={cn(
		buttonVariants({ variant: "outline" }),
		"appearance-none bg-transparent font-normal",
		className
	)}
	{...$$restProps}
>
	<slot />
</FormPrimitive.Select>
<ChevronDown class="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
