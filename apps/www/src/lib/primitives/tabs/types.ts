import type { CreateTabsProps, TabsTriggerProps } from "@melt-ui/svelte";
import type {
	Expand,
	HTMLDivAttributes,
	ObjectVariation,
	OmitValue
} from "../internal/types";

type Props = Expand<
	OmitValue<CreateTabsProps> & {
		orientation?: CreateTabsProps["orientation"] & {};
		value?: CreateTabsProps["defaultValue"] & {};
	}
> &
	HTMLDivAttributes;

type ContentProps = {
	value: string;
} & HTMLDivAttributes;

type TriggerProps = Expand<ObjectVariation<TabsTriggerProps>> &
	HTMLDivAttributes;

type ListProps = HTMLDivAttributes;

export type {
	Props,
	ContentProps,
	TriggerProps,
	ListProps,
	//
	Props as TabsProps,
	ContentProps as TabsContentProps,
	TriggerProps as TabsTriggerProps,
	ListProps as TabsListProps
};
