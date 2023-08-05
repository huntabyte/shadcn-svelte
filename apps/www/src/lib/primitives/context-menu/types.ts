import type { HTMLDivAttributes } from "$primitives/internal";
import type {
	CreateContextMenuProps,
	CreateContextMenuCheckboxItemProps,
	CreateContextMenuRadioGroupProps,
	ContextMenuRadioItemProps,
	CreateContextSubmenuProps
} from "@melt-ui/svelte";

type Props = CreateContextMenuProps;
type CheckboxItemProps = CreateContextMenuCheckboxItemProps & HTMLDivAttributes;
type ContentProps = HTMLDivAttributes;
type GroupProps = HTMLDivAttributes;
type ItemProps = HTMLDivAttributes;
type CheckboxItemIndicatorProps = HTMLDivAttributes;
type LabelProps = HTMLDivAttributes;
type RadioGroupProps = CreateContextMenuRadioGroupProps & HTMLDivAttributes;
type RadioItemProps = ContextMenuRadioItemProps & HTMLDivAttributes;
type SeparatorProps = HTMLDivAttributes;
type SubProps = CreateContextSubmenuProps;
type SubContentProps = HTMLDivAttributes;
type SubTriggerProps = HTMLDivAttributes;
type TriggerProps = HTMLDivAttributes & {
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
