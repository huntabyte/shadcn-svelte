export { default as Provider } from "./components/message-scroller-provider.svelte";
export { default as Root } from "./components/message-scroller.svelte";
export { default as Viewport } from "./components/message-scroller-viewport.svelte";
export { default as Content } from "./components/message-scroller-content.svelte";
export { default as Item } from "./components/message-scroller-item.svelte";
export { default as Button } from "./components/message-scroller-button.svelte";

export type {
	MessageScrollerProviderProps as ProviderProps,
	MessageScrollerRootProps as RootProps,
	MessageScrollerViewportProps as ViewportProps,
	MessageScrollerContentProps as ContentProps,
	MessageScrollerItemProps as ItemProps,
	MessageScrollerButtonProps as ButtonProps,
	MessageScrollerDefaultScrollPosition,
	MessageScrollerScrollAlign,
	MessageScrollerScrollOptions,
	MessageScrollerScrollable,
	MessageScrollerVisibilityState,
} from "./types.js";
