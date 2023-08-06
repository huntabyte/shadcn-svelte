import type {
	HTMLDivAttributes,
	OmitChecked,
	OmitOpen,
	OmitValue
} from "$primitives/internal";
import type {
	CreateDropdownMenuProps,
	CreateDropdownMenuCheckboxItemProps,
	CreateDropdownMenuRadioGroupProps,
	DropdownMenuRadioItemProps,
	CreateDropdownSubmenuProps
} from "@melt-ui/svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

type Props = Expand<
	OmitOpen<CreateDropdownMenuProps> & {
		open?: CreateDropdownMenuProps["defaultOpen"] & {};
	}
>;

type CheckboxItemProps = Expand<
	OmitChecked<CreateDropdownMenuCheckboxItemProps> & {
		checked?: CreateDropdownMenuCheckboxItemProps["defaultChecked"] & {};
	}
> &
	HTMLDivAttributes;

type RadioGroupProps = Expand<
	OmitValue<CreateDropdownMenuRadioGroupProps> & {
		value?: CreateDropdownMenuRadioGroupProps["defaultValue"] & {};
	}
> &
	HTMLDivAttributes;

type ContentProps = HTMLDivAttributes;
type GroupProps = HTMLDivAttributes;
type ItemProps = HTMLDivAttributes;
type CheckboxItemIndicatorProps = HTMLDivAttributes;
type LabelProps = HTMLDivAttributes;
type RadioItemProps = DropdownMenuRadioItemProps & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type SubProps = Expand<CreateDropdownSubmenuProps>;
type SubContentProps = HTMLDivAttributes;
type SubTriggerProps = HTMLDivAttributes;
type TriggerProps = {
	asChild?: boolean;
} & HTMLButtonAttributes;

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
	TriggerProps,

	//
	Props as DropdownMenuProps,
	CheckboxItemProps as DropdownMenuCheckboxItemProps,
	ContentProps as DropdownMenuContentProps,
	GroupProps as DropdownMenuGroupProps,
	ItemProps as DropdownMenuItemProps,
	CheckboxItemIndicatorProps as DropdownMenuCheckboxItemIndicatorProps,
	LabelProps as DropdownMenuLabelProps,
	RadioGroupProps as DropdownMenuRadioGroupProps,
	RadioItemProps as DropdownMenuRadioItemProps,
	SeparatorProps as DropdownMenuSeparatorProps,
	SubProps as DropdownMenuSubProps,
	SubContentProps as DropdownMenuSubContentProps,
	SubTriggerProps as DropdownMenuSubTriggerProps,
	TriggerProps as DropdownMenuTriggerProps
};
