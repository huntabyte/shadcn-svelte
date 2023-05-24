import TabsContent from "./TabsContent.svelte";
import TabsList from "./TabsList.svelte";
import TabsTrigger from "./TabsTrigger.svelte";
import { Tabs as TabsPrimitive } from "radix-svelte";

const Tabs = TabsPrimitive.Root;

export { Tabs, TabsContent, TabsList, TabsTrigger };
