<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<p
	class={cn("text-foreground max-w-2xl text-balance text-lg font-light", className)}
	{...$$restProps}
>
	<slot></slot>
</p>
