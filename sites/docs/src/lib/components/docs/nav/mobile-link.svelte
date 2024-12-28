<script lang="ts">
	import { page } from "$app/state";
	import { type PrimitiveAnchorAttributes, cn } from "$lib/utils.js";

	let {
		open = $bindable(false),
		href,
		class: className,
		children,
		...restProps
	}: PrimitiveAnchorAttributes & { open: boolean } = $props();

	function handleClick() {
		open = false;
	}
</script>

<a
	{href}
	class={cn(page.url.pathname === href ? "text-foreground" : "text-foreground/60", className)}
	onclick={handleClick}
	{...restProps}
>
	{@render children?.()}
</a>
