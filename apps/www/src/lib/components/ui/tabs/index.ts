import {
	createTabs,
	melt,
	type CreateTabsProps,
	type Tabs as TabsReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

import { default as Root, type RootProps } from "./Tabs.svelte";
import { default as Content, type ContentProps } from "./TabsContent.svelte";
import { default as List, type ListProps } from "./TabsList.svelte";
import { default as Trigger, type TriggerProps } from "./TabsTrigger.svelte";

const NAME = "Tabs";

export const ctx = {
	set: setTabs,
	get: getTabs
};

function getTabs() {
	return getContext<TabsReturn>(NAME);
}

function setTabs(props: CreateTabsProps) {
	setContext(NAME, createTabs({ ...props }));

	return getTabs();
}

export const Tabs = Object.assign(Root, {
	Content,
	List,
	Trigger
});

export {
	Root as TabsRoot,
	Content as TabsContent,
	List as TabsList,
	Trigger as TabsTrigger,
	melt
};

export type TabsElements = {
	root: RootProps;
	content: ContentProps;
	trigger: TriggerProps;
	list: ListProps;
};
