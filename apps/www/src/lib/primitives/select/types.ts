import type { CreateSelectProps, SelectOptionProps } from "@melt-ui/svelte";
import type { HTMLDivAttributes, OmitOpen, OmitValue } from "../internal/types";
import type {
	HTMLAttributes,
	HTMLButtonAttributes,
	HTMLInputAttributes
} from "svelte/elements";

type Props = Expand<
	OmitOpen<
		OmitValue<Omit<CreateSelectProps, "defaultValueLabel" | "forceVisible">>
	> & {
		value?: CreateSelectProps["defaultValue"] & {};
		open?: CreateSelectProps["defaultOpen"] & {};
		label?: CreateSelectProps["defaultValueLabel"] & {};
	}
>;

type ContentProps = HTMLDivAttributes;
type GroupProps = HTMLDivAttributes;
type InputProps = HTMLInputAttributes;
type LabelProps = HTMLDivAttributes;
type ItemProps = Expand<SelectOptionProps> & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type TriggerProps = HTMLButtonAttributes;
type ValueProps = {
	placeholder?: string;
} & HTMLAttributes<HTMLSpanElement>;

export type {
	Props,
	ContentProps,
	GroupProps,
	InputProps,
	LabelProps,
	ItemProps,
	SeparatorProps,
	TriggerProps,
	ValueProps,
	//
	Props as SelectProps,
	ContentProps as SelectContentProps,
	GroupProps as SelectGroupProps,
	InputProps as SelectInputProps,
	LabelProps as SelectLabelProps,
	ItemProps as SelectItemProps,
	SeparatorProps as SelectSeparatorProps,
	TriggerProps as SelectTriggerProps,
	ValueProps as SelectValueProps
};
