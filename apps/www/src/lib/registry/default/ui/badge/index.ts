import { tv, type VariantProps } from "tailwind-variants";
export { default as Badge } from "./badge.svelte";

export const badgeVariants = tv({
	base: "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
});

export type Variant = VariantProps<typeof badgeVariants>["variant"];
