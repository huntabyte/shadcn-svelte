<script lang="ts">
	import { cn } from "$lib/utils";
	import { badgeVariants, type Variant } from ".";

	export let href: string | undefined = undefined;
	export let variant: Variant = "default";
	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<svelte:element
	this={href ? "a" : "span"}
	{href}
	class={cn(badgeVariants({ variant, className }))}
	{...$$restProps}
>
	<slot />
</svelte:element>
