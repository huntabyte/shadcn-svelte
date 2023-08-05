import type {
	HTMLDivAttributes,
	OmitChecked,
	OmitOpen,
	OmitValue
} from "$primitives/internal";
import type {
	CreateContextMenuProps,
	CreateContextMenuCheckboxItemProps,
	CreateContextMenuRadioGroupProps,
	ContextMenuRadioItemProps,
	CreateContextSubmenuProps
} from "@melt-ui/svelte";

type Props = Expand<
	OmitOpen<CreateContextMenuProps> & {
		open?: CreateContextMenuProps["defaultOpen"] & {};
	}
>;

type CheckboxItemProps = Expand<
	OmitChecked<CreateContextMenuCheckboxItemProps> & {
		checked?: CreateContextMenuCheckboxItemProps["defaultChecked"] & {};
	}
> &
	HTMLDivAttributes;

type RadioGroupProps = Expand<
	OmitValue<CreateContextMenuRadioGroupProps> & {
		value?: CreateContextMenuRadioGroupProps["defaultValue"] & {};
	}
> &
	HTMLDivAttributes;

type ContentProps = HTMLDivAttributes;
type GroupProps = HTMLDivAttributes;
type ItemProps = HTMLDivAttributes;
type CheckboxItemIndicatorProps = HTMLDivAttributes;
type LabelProps = HTMLDivAttributes;
type RadioItemProps = ContextMenuRadioItemProps & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type SubProps = Expand<CreateContextSubmenuProps>;
type SubContentProps = HTMLDivAttributes;
type SubTriggerProps = HTMLDivAttributes;
type TriggerProps = {
	asChild?: boolean;
} & HTMLDivAttributes;

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
