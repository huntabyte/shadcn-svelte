<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cva } from "class-variance-authority";
	import { cn } from "$lib/utils";

	const badgeVariants = cva(
		"inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
		{
			variants: {
				variant: {
					default:
						"bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
					secondary:
						"bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
					destructive:
						"bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
					outline: "text-foreground"
				}
			},
			defaultVariants: {
				variant: "default"
			}
		}
	);

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
