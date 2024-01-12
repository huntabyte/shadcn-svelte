<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div
	class={cn("flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 mt-4", className)}
	{...$$restProps}
>
	<slot />
</div>
