import * as TabsPrimitive from "$primitives/tabs";
import Content from "./TabsContent.svelte";
import List from "./TabsList.svelte";
import Trigger from "./TabsTrigger.svelte";

const Root = TabsPrimitive.Root;

export {
	Root,
	Content,
	List,
	Trigger,
	//
	Root as Tabs,
	Content as TabsContent,
	List as TabsList,
	Trigger as TabsTrigger
};
