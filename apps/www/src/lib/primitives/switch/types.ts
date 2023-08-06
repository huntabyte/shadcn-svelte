import type { CreateSwitchProps } from "@melt-ui/svelte";
import type { HTMLSpanAttributes, OmitChecked } from "../internal/types";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = Expand<
	OmitChecked<CreateSwitchProps> & {
		checked?: CreateSwitchProps["defaultChecked"] & {};
	}
> &
	HTMLButtonAttributes;

type ThumbProps = HTMLSpanAttributes;

export type {
	Props,
	ThumbProps,
	//
	Props as SwitchProps,
	ThumbProps as SwitchThumbProps
};
