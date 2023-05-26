<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import { cva } from "class-variance-authority";
	import { cn } from "$lib/utils";

	const alertVariants = cva(
		"relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
		{
			variants: {
				variant: {
					default: "bg-background text-foreground",
					destructive:
						"text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive"
				}
			},
			defaultVariants: {
				variant: "default"
			}
		}
	);

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: VariantProps<typeof alertVariants>["variant"] =
		"default";
</script>

<div class={cn(alertVariants({ variant }), className)} {...$$restProps}>
	<slot />
</div>
