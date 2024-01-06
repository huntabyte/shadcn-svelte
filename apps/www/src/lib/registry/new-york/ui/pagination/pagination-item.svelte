<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLLIElement> & {
		isVisible?: boolean | undefined;
	};

	let className: $$Props["class"] = undefined;
	export let isVisible: $$Props["isVisible"] = true;
	export { className as class };
</script>

<li
	class={cn(isVisible ? "block" : "hidden sm:block", className)}
	{...$$restProps}
>
	<slot />
</li>
