<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let href: string | undefined | null = undefined;

	type $$Props = HTMLAnchorAttributes & {
		class?: string | null;
		href?: string | null;
	};
	const trigger = ctx.getTrigger();
</script>

<a use:melt={$trigger} {href} class={className} {...$$restProps}>
	<slot />
</a>
