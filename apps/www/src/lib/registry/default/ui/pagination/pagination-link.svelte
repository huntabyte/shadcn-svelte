<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { Button } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";

	type $$Props = PaginationPrimitive.PageProps;
	type $$Events = PaginationPrimitive.PageEvents;

	let className: $$Props["class"] = undefined;
	export let page: $$Props["page"];
	export { className as class };
</script>

<PaginationPrimitive.Page bind:page let:builder asChild>
	<Button
		variant="ghost"
		class={cn("gap-1 pl-2.5", className)}
		builders={[builder]}
		on:click
		{...$$restProps}
	/>
</PaginationPrimitive.Page>
