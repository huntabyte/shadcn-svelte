import type { HTMLDivAttributes } from "$primitives/internal";
import type {
	CreateDropdownMenuProps,
	CreateDropdownMenuCheckboxItemProps,
	CreateDropdownMenuRadioGroupProps,
	DropdownMenuRadioItemProps,
	CreateDropdownSubmenuProps
} from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = CreateDropdownMenuProps;
type CheckboxItemProps = CreateDropdownMenuCheckboxItemProps &
	HTMLDivAttributes;
type ContentProps = HTMLDivAttributes;
type GroupProps = HTMLDivAttributes;
type ItemProps = HTMLDivAttributes;
type CheckboxItemIndicatorProps = HTMLDivAttributes;
type LabelProps = HTMLDivAttributes;
type RadioGroupProps = CreateDropdownMenuRadioGroupProps & HTMLDivAttributes;
type RadioItemProps = DropdownMenuRadioItemProps & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type SubProps = CreateDropdownSubmenuProps;
type SubContentProps = HTMLDivAttributes;
type SubTriggerProps = HTMLDivAttributes;
type TriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};

export type {
	Props,
	CheckboxItemProps,
	ContentProps,
	GroupProps,
	ItemProps,
	CheckboxItemIndicatorProps,
	LabelProps,
	RadioGroupProps,
	RadioItemProps,
	SeparatorProps,
	SubProps,
	SubContentProps,
	SubTriggerProps,
	TriggerProps
};
