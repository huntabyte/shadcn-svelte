import Root from "./navigation-menu.svelte";
import List from "./navigation-menu-list.svelte";
import Item from "./navigation-menu-item.svelte";
import Content from "./navigation-menu-content.svelte";
import Trigger, { navigationMenuTriggerStyle } from "./navigation-menu-trigger.svelte";
import Indicator from "./navigation-menu-indicator.svelte";
import Link from "./navigation-menu-link.svelte";
import Viewport from "./navigation-menu-viewport.svelte";

export {
	Root,
	List,
	Item,
	Content,
	Trigger,
	Indicator,
	Link,
	Viewport,
	//
	Root as NavigationMenu,
	List as NavigationMenuList,
	Item as NavigationMenuItem,
	Content as NavigationMenuContent,
	Trigger as NavigationMenuTrigger,
	Link as NavigationMenuLink,
	Indicator as NavigationMenuIndicator,
	Viewport as NavigationMenuViewport,
	//
	navigationMenuTriggerStyle,
};
