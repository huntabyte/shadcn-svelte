<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { Button } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";

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
