import Button from "./message-scroller-button.svelte";
import Content from "./message-scroller-content.svelte";
import Item from "./message-scroller-item.svelte";
import Provider from "./message-scroller-provider.svelte";
import Root from "./message-scroller.svelte";
import Viewport from "./message-scroller-viewport.svelte";

export {
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
} from "@shadcn/svelte/message-scroller";

export {
	Provider,
	Root,
	Viewport,
	Content,
	Item,
	Button,
	//
	Provider as MessageScrollerProvider,
	Root as MessageScroller,
	Viewport as MessageScrollerViewport,
	Content as MessageScrollerContent,
	Item as MessageScrollerItem,
	Button as MessageScrollerButton,
};
