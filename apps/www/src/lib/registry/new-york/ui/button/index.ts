import type { Button as ButtonPrimitive, WithElementRef } from "bits-ui";
import { type VariantProps, tv } from "tailwind-variants";
import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./button.svelte";
import type { PrimitiveAnchorAttributes, PrimitiveButtonAttributes } from "$lib/utils.js";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive:
				"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline:
				"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "size-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type Props = PrimitiveButtonAttributes &
	PrimitiveAnchorAttributes & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};
