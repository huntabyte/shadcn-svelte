import type {
	HTMLDivAttributes,
	HTMLSpanAttributes
} from "$primitives/internal";
import type { CreateAvatarProps } from "@melt-ui/svelte";
import type { HTMLImgAttributes } from "svelte/elements";

type Props = Expand<
	Omit<
		CreateAvatarProps,
		"onLoadingStatusChange" | "loadingStatus" | "src"
	> & {
		loadingStatus?: "loading" | "loaded" | "error";
	}
> &
	HTMLDivAttributes;

type ImageProps = HTMLImgAttributes;

type FallbackProps = HTMLSpanAttributes;

export type {
	Props,
	ImageProps,
	FallbackProps,
	//
	Props as AvatarProps,
	ImageProps as AvatarImageProps,
	FallbackProps as AvatarFallbackProps
};
