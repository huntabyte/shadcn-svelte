<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes["href"] = undefined;
	type $$Props = HTMLAnchorAttributes;
</script>

<a {href} class={cn("font-medium underline underline-offset-4", className)} {...$$restProps}>
	<slot />
</a>
