import type { HTMLDivAttributes } from "$primitives/internal";
import type { CreateCheckboxProps } from "@melt-ui/svelte";
import type { OmitChecked } from "$primitives/internal/types";
import type {
	HTMLButtonAttributes,
	HTMLInputAttributes
} from "svelte/elements";

type Props = Expand<
	OmitChecked<CreateCheckboxProps> & {
		checked?: CreateCheckboxProps["defaultChecked"] & {};
	}
> &
	HTMLButtonAttributes;

type IndicatorProps = HTMLDivAttributes;
type InputProps = HTMLInputAttributes;

export type {
	Props,
	IndicatorProps,
	InputProps,
	//
	Props as CheckboxProps,
	IndicatorProps as CheckboxIndicatorProps,
	InputProps as CheckboxInputProps
};
