<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = PaginationPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<PaginationPrimitive.Root
	count={100}
	perPage={10}
	let:pages
	let:range
	class={cn("mx-auto flex w-full justify-center", className)}
	{...$$restProps}
>
	<slot />
</PaginationPrimitive.Root>
