import type {
	HTMLDivAttributes,
	HTMLHeadingAttributes,
	RemoveOpen,
	Expand
} from "$primitives/internal";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { CreateDialogProps } from "@melt-ui/svelte";

type Props = Expand<
	RemoveOpen<Omit<CreateDialogProps, "role">> & {
		open?: CreateDialogProps["defaultOpen"] & {};
	}
>;

type TriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};

type ActionProps = TriggerProps;
type CancelProps = TriggerProps;
type ContentProps = HTMLDivAttributes;
type DescriptionProps = HTMLDivAttributes;
type OverlayProps = HTMLDivAttributes;
type PortalProps = HTMLDivAttributes;
type TitleProps = HTMLHeadingAttributes & {
	level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export type {
	Props,
	TriggerProps,
	ActionProps,
	CancelProps,
	ContentProps,
	DescriptionProps,
	OverlayProps,
	PortalProps,
	TitleProps,
	//
	Props as AlertDialogProps,
	TriggerProps as AlertDialogTriggerProps,
	ActionProps as AlertDialogActionProps,
	CancelProps as AlertDialogCancelProps,
	ContentProps as AlertDialogContentProps,
	DescriptionProps as AlertDialogDescriptionProps,
	OverlayProps as AlertDialogOverlayProps,
	PortalProps as AlertDialogPortalProps,
	TitleProps as AlertDialogTitleProps
};
