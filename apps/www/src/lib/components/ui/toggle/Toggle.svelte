<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import type { ToggleRootProps } from "radix-svelte";
	import { cva } from "class-variance-authority";
	import { Toggle as TogglePrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	const toggleVariants = cva(
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-muted hover:text-muted-foreground",
		{
			variants: {
				variant: {
					default: "bg-transparent",
					outline:
						"bg-transparent border border-input hover:bg-accent hover:text-accent-foreground"
				},
				size: {
					default: "h-10 px-3",
					sm: "h-9 px-2.5",
					lg: "h-11 px-5"
				}
			},
			defaultVariants: {
				variant: "default",
				size: "default"
			}
		}
	);

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: VariantProps<typeof toggleVariants>["variant"] =
		"default";
	export let size: VariantProps<typeof toggleVariants>["size"] = "default";
	export let pressed: ToggleRootProps["disabled"] = false;
	export let disabled: ToggleRootProps["disabled"] = false;
</script>

<TogglePrimitive.Root
	class={cn(toggleVariants({ variant, size, className }))}
	bind:pressed
	bind:disabled
	{...$$restProps}
>
	<slot />
</TogglePrimitive.Root>
