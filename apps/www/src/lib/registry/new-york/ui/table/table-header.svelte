<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<thead
	class={cn("[&_tr]:border-b", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</thead>
