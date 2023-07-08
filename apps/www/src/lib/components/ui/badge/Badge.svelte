<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import { badgeVariants } from ".";

	export let href: HTMLAnchorAttributes["href"] = undefined;
	export let variant: VariantProps<typeof badgeVariants>["variant"] =
		"default";
	let className: string | undefined | null = undefined;
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
