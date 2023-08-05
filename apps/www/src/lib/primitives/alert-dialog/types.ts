import type {
	HTMLDivAttributes,
	HTMLHeadingAttributes
} from "$primitives/internal";
import type { HTMLButtonAttributes } from "svelte/elements";

export type {
	CreateDialogProps as AlertDialogProps,
	Dialog as AlertDialogReturn
} from "@melt-ui/svelte";

export type AlertDialogTriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};
export type AlertDialogActionProps = AlertDialogTriggerProps;

export type AlertDialogCancelProps = AlertDialogTriggerProps;
export type AlertDialogContentProps = HTMLDivAttributes;
export type AlertDialogDescriptionProps = HTMLDivAttributes;
export type AlertDialogOverlayProps = HTMLDivAttributes;
export type AlertDialogPortalProps = HTMLDivAttributes;
export type AlertDialogTitleProps = HTMLHeadingAttributes & {
	level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
