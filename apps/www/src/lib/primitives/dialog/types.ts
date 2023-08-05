import type {
	HTMLDivAttributes,
	HTMLHeadingAttributes,
	OmitOpen
} from "$primitives/internal";
import type { HTMLButtonAttributes } from "svelte/elements";

import type { CreateDialogProps } from "@melt-ui/svelte";

type Props = Expand<
	OmitOpen<Omit<CreateDialogProps, "role">> & {
		open?: CreateDialogProps["defaultOpen"] & {};
	}
>;

type TriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};

type CloseProps = TriggerProps;
type ContentProps = HTMLDivAttributes;
type DescriptionProps = HTMLDivAttributes;
type OverlayProps = HTMLDivAttributes;
type PortalProps = HTMLDivAttributes;
type TitleProps = HTMLHeadingAttributes & {
	level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export type {
	Props,
	CloseProps,
	TitleProps,
	PortalProps,
	ContentProps,
	TriggerProps,
	OverlayProps,
	DescriptionProps,
	//
	Props as DialogProps,
	CloseProps as DialogCloseProps,
	TitleProps as DialogTitleProps,
	PortalProps as DialogPortalProps,
	ContentProps as DialogContentProps,
	TriggerProps as DialogTriggerProps,
	OverlayProps as DialogOverlayProps,
	DescriptionProps as DialogDescriptionProps
};
