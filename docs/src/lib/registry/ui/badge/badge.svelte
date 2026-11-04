<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "cn-badge group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
		variants: {
			variant: {
				default: "cn-badge-variant-default",
				secondary: "cn-badge-variant-secondary",
				destructive: "cn-badge-variant-destructive",
				outline: "cn-badge-variant-outline",
				ghost: "cn-badge-variant-ghost",
				link: "cn-badge-variant-link",
				// Picked automatically when a tone is set, so the solid default fill never sits under a tone.
				tone: "",
			},
			// Chip tones: a soft tint with readable ink, the --ledger-chip-<tone>-bg and -ink tokens. Use a tone for tags and
			// status; keep the solid default badge for counts. Ported from Another UI (React) badge-variants and ledger-tokens.
			tone: {
				gray: "bg-[var(--ledger-chip-gray-bg)] text-[var(--ledger-chip-gray-ink)] [a]:hover:opacity-80",
				blue: "bg-[var(--ledger-chip-blue-bg)] text-[var(--ledger-chip-blue-ink)] [a]:hover:opacity-80",
				green: "bg-[var(--ledger-chip-green-bg)] text-[var(--ledger-chip-green-ink)] [a]:hover:opacity-80",
				red: "bg-[var(--ledger-chip-red-bg)] text-[var(--ledger-chip-red-ink)] [a]:hover:opacity-80",
				orange: "bg-[var(--ledger-chip-orange-bg)] text-[var(--ledger-chip-orange-ink)] [a]:hover:opacity-80",
				yellow: "bg-[var(--ledger-chip-yellow-bg)] text-[var(--ledger-chip-yellow-ink)] [a]:hover:opacity-80",
				purple: "bg-[var(--ledger-chip-purple-bg)] text-[var(--ledger-chip-purple-ink)] [a]:hover:opacity-80",
				pink: "bg-[var(--ledger-chip-pink-bg)] text-[var(--ledger-chip-pink-ink)] [a]:hover:opacity-80",
				turquoise: "bg-[var(--ledger-chip-turquoise-bg)] text-[var(--ledger-chip-turquoise-ink)] [a]:hover:opacity-80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = Exclude<VariantProps<typeof badgeVariants>["variant"], "tone">;
	export type BadgeTone = VariantProps<typeof badgeVariants>["tone"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		tone,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		tone?: BadgeTone;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant: tone ? "tone" : variant, tone }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
