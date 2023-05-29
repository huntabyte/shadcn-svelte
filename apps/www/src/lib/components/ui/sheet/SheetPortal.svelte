<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import { cva } from "class-variance-authority";
	import { Dialog as SheetPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	const portalVariants = cva("fixed inset-0 z-50 flex", {
		variants: {
			position: {
				top: "items-start",
				bottom: "items-end",
				left: "justify-start",
				right: "justify-end"
			}
		},
		defaultVariants: { position: "right" }
	});

	let className: string | undefined | null = undefined;
	export { className as class };
	export let position: VariantProps<typeof portalVariants>["position"] =
		"right";
</script>

<SheetPrimitive.Portal class={cn(className)} {...$$restProps}>
	<div class={portalVariants({ position })}>
		<slot />
	</div>
</SheetPrimitive.Portal>
