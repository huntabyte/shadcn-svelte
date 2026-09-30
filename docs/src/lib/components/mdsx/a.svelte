<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let { class: className, children, href, ...restProps }: HTMLAnchorAttributes = $props();

	const internal = $derived(href?.startsWith("/") || href?.startsWith("#"));
	const rel = $derived(!internal ? "noopener noreferrer" : undefined);
	const target = $derived(!internal ? "_blank" : undefined);
</script>

<a {href} {target} {rel} class={className} {...restProps}>
	{@render children?.()}
</a>
