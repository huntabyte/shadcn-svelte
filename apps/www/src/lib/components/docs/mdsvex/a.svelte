<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes["href"] = undefined;
</script>

<a
	{href}
	class={cn("font-medium underline underline-offset-4", className)}
	{...$$restProps}
>
	<slot />
</a>
