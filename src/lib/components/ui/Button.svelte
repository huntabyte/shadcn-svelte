<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLAttributes,
		HTMLButtonAttributes,
		SvelteHTMLElements
	} from "svelte/elements";
	import { type VariantProps, cva } from "class-variance-authority";
	import { cn } from "$lib/utils";

	const buttonVariants = cva(
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
		{
			variants: {
				variant: {
					default: "bg-primary text-primary-foreground hover:bg-primary/90",
					destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					outline: "border border-input hover:bg-accent hover:text-accent-foreground",
					secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
					ghost: "hover:bg-accent hover:text-accent-foreground",
					link: "underline-offset-4 hover:underline text-primary"
				},
				size: {
					default: "h-10 py-2 px-4",
					sm: "h-9 px-3 rounded-md",
					lg: "h-11 px-8 rounded-md"
				}
			},
			defaultVariants: {
				variant: "default",
				size: "default"
			}
		}
	);

	export let href: HTMLAnchorAttributes["href"] = undefined;
	export let type: HTMLButtonAttributes["type"] = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>["variant"] = "default";
	export let size: VariantProps<typeof buttonVariants>["size"] = "default";

	$: buttonClasses = cn(buttonVariants({ variant, size, className }));
</script>

<svelte:element
	this={href ? "a" : "button"}
	type={href ? undefined : type}
	{href}
	class={buttonClasses}
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
