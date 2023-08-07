<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tbody class={cn("[&_tr:last-child]:border-0", className)} {...$$restProps}>
	<slot />
</tbody>
