import type { HTMLDivAttributes } from "$primitives/internal";
import type { CreateCheckboxProps } from "@melt-ui/svelte";
import type {
	HTMLButtonAttributes,
	HTMLInputAttributes
} from "svelte/elements";

type Props = CreateCheckboxProps & HTMLButtonAttributes;
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
