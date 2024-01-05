<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { Button } from "@/registry/new-york/ui/button";
	import { cn } from "$lib/utils";
	import { ChevronRight } from "radix-icons-svelte";

	type $$Props = PaginationPrimitive.NextButtonProps;
	type $$Events = PaginationPrimitive.NextButtonEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<PaginationPrimitive.NextButton asChild let:builder>
	<Button
		variant="ghost"
		class={cn("gap-1 pl-2.5", className)}
		builders={[builder]}
		on:click
		{...$$restProps}
	>
		<span>Next</span>
		<ChevronRight class="h-4 w-4" />
	</Button>
</PaginationPrimitive.NextButton>
