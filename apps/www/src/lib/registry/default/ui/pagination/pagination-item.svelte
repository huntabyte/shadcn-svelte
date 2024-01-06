<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLLIElement> & {
		isActive: boolean | undefined;
	};

	let className: $$Props["class"] = undefined;
	export let isActive: $$Props["isActive"] = false;

	export { className as class };
</script>

<li
	class={cn(isActive ? "block" : "hidden sm:block", className)}
	{...$$restProps}
>
	<slot />
</li>
