import type {
	HTMLDivAttributes,
	HTMLHeadingAttributes
} from "$primitives/internal";
import type { HTMLButtonAttributes } from "svelte/elements";

import type { CreateDialogProps as Props } from "@melt-ui/svelte";

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
