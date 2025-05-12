import { Tabs as TabsPrimitive } from "bits-ui";

export { default as List } from "./doc-tabs-list.svelte";
export { default as Trigger } from "./doc-tabs-trigger.svelte";
export { default as Content } from "./doc-tabs-content.svelte";

export const Root = TabsPrimitive.Root as typeof TabsPrimitive.Root;
