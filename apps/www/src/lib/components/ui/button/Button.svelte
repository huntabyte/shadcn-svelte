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

	type Props = {
		class?: string | null;
		variant?: VariantProps<typeof buttonVariants>["variant"];
		size?: VariantProps<typeof buttonVariants>["size"];
	};

	interface AnchorElement extends Props, HTMLAnchorAttributes {
		href?: HTMLAnchorAttributes["href"];
		type?: never;
	}

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes["type"];
		href?: never;
	}

	type $$Props = AnchorElement | ButtonElement;
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
