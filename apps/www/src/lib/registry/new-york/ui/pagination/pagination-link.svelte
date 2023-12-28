<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { buttonVariants } from "@/registry/new-york/ui/button";
	import { cn } from "$lib/utils";

	type $$Props = PaginationPrimitive.NextButtonProps;
	type $$Events = PaginationPrimitive.NextButtonEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<PaginationPrimitive.PrevButton
	class={cn(buttonVariants(), className)}
	{...$$restProps}
	on:click
	let:builder
>
	<slot {builder} />
</PaginationPrimitive.PrevButton>
