<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes
	} from "svelte/elements";
	import { cn } from "$lib/utils";
	import { buttonVariants } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes["href"] = undefined;
	export let type: HTMLButtonAttributes["type"] = undefined;
	export let variant: VariantProps<typeof buttonVariants>["variant"] =
		"default";
	export let size: VariantProps<typeof buttonVariants>["size"] = "default";
</script>

<svelte:element
	this={href ? "a" : "button"}
	type={href ? undefined : type}
	{href}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</svelte:element>
