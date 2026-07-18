import Provider from "./message-scroller-provider.svelte";
import Root from "./message-scroller.svelte";
import Viewport from "./message-scroller-viewport.svelte";
import Content from "./message-scroller-content.svelte";
import Item from "./message-scroller-item.svelte";
import Button from "./message-scroller-button.svelte";

export {
	Provider,
	Root,
	Viewport,
	Content,
	Item,
	Button,
	Provider as MessageScrollerProvider,
	Root as MessageScroller,
	Viewport as MessageScrollerViewport,
	Content as MessageScrollerContent,
	Item as MessageScrollerItem,
	Button as MessageScrollerButton,
};

export {
	useMessageScroller,
	useMessageScrollerScrollable,
	useMessageScrollerVisibility,
	type ScrollDirection,
} from "./message-scroller.svelte.js";
