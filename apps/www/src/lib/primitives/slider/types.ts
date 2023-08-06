import type { CreateSliderProps } from "@melt-ui/svelte";
import type { Expand, OmitValue, HTMLSpanAttributes } from "../internal/types";

type Props = Expand<
	OmitValue<CreateSliderProps> & {
		value?: CreateSliderProps["defaultValue"] & {};
	}
> &
	HTMLSpanAttributes;

type RangeProps = HTMLSpanAttributes;

type ThumbProps = HTMLSpanAttributes;

export type {
	Props,
	RangeProps,
	ThumbProps,
	//
	Props as SliderProps,
	RangeProps as SliderRange,
	ThumbProps as SliderThumb
};
