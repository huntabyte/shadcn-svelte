<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	type $$Props = PaginationPrimitive.Props;
	type $$Events = PaginationPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let count: $$Props["count"] = 100;
	export let perPage: $$Props["perPage"] = 10;

	export { className as class };
</script>

<PaginationPrimitive.Root
	{count}
	{perPage}
	let:builder
	let:pages
	let:range
	asChild
	{...$$restProps}
>
	<nav
		{...builder}
		class={cn("mx-auto flex w-full justify-center", className)}
	>
		<slot {pages} {range} />
	</nav>
</PaginationPrimitive.Root>
