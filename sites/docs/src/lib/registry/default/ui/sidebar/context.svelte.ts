import { getContext, setContext } from "svelte";
import { IsMobile } from "$lib/registry/default/hooks/is-mobile.svelte.js";
import { SIDEBAR_KEYBOARD_SHORTCUT } from "./constants.js";

type Getter<T> = () => T;

export type SidebarStateProps = {
	open: Getter<boolean>;
	setOpen: (open: boolean) => void;
};

class SidebarState {
	// syncing with the `open` component prop to support `bind:open`
	open = $derived.by(() => this.props.open());
	openMobile = $state(false);
	setOpen: SidebarStateProps["setOpen"];
	#isMobile: IsMobile;
	stateAttr = $derived.by(() => (this.open ? "expanded" : "collapsed"));

	constructor(readonly props: SidebarStateProps) {
		this.setOpen = props.setOpen;
		this.#isMobile = new IsMobile();
	}

	get isMobile() {
		return this.#isMobile.current;
	}

	// Event handler to apply to the `<svelte:window>`
	handleShortcutKeydown = (e: KeyboardEvent) => {
		if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			this.toggleSidebar();
		}
	};

	setOpenMobile = (value: boolean) => {
		this.openMobile = value;
	};

	toggleSidebar() {
		return this.#isMobile.current
			? (this.openMobile = !this.openMobile)
			: this.setOpen(!this.open);
	}
}

const SYMBOL_KEY = "scn-sidebar";

export function setSidebarContext(props: SidebarStateProps): SidebarState {
	return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}

export function getSidebarContext(): ReturnType<typeof setSidebarContext> {
	return getContext(Symbol.for(SYMBOL_KEY));
}
