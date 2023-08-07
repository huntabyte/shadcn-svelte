import { cva, type VariantProps } from "class-variance-authority";

export { default as Alert } from "./Alert.svelte";
export { default as AlertDescription } from "./AlertDescription.svelte";
export { default as AlertTitle } from "./AlertTitle.svelte";

export const alertVariants = cva(
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

export type Variant = VariantProps<typeof alertVariants>["variant"];
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
