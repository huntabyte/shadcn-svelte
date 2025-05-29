import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
import { getContext, hasContext, setContext } from "svelte";
import { SIDEBAR_KEYBOARD_SHORTCUT } from "./constants.js";

type Getter<T> = () => T;

export type SidebarStateProps = {
	/**
	 * A getter function that returns the current open state of the sidebar.
	 * We use a getter function here to support `bind:open` on the `Sidebar.Provider`
	 * component.
	 */
	open: Getter<boolean>;

	/**
	 * A function that sets the open state of the sidebar. To support `bind:open`, we need
	 * a source of truth for changing the open state to ensure it will be synced throughout
	 * the sub-components and any `bind:` references.
	 */
	setOpen: (open: boolean) => void;
};

class SidebarState {
	readonly props: SidebarStateProps;
	open = $derived.by(() => this.props.open());
	openMobile = $state(false);
	setOpen: SidebarStateProps["setOpen"];
	#isMobile: IsMobile;
	state = $derived.by(() => (this.open ? "expanded" : "collapsed"));

	constructor(props: SidebarStateProps) {
		this.setOpen = props.setOpen;
		this.#isMobile = new IsMobile();
		this.props = props;
	}

	/**
	 * Whether the sidebar is currently mobile
	 */
	get isMobile() {
		return this.#isMobile.current;
	}

	/**
	 * An event handler to apply to an element that should trigger the sidebar
	 * to toggle when the keyboard shortcut is pressed.
	 */
	handleShortcutKeydown = (e: KeyboardEvent) => {
		if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			this.toggle();
		}
	};

	setOpenMobile = (value: boolean) => {
		this.openMobile = value;
	};

	toggle = () => {
		return this.#isMobile.current
			? (this.openMobile = !this.openMobile)
			: this.setOpen(!this.open);
	};
}

const SYMBOL_KEY = "scn-sidebar";

/**
 * Instantiates a new `SidebarState` instance and sets it in the context.
 *
 * @param props The constructor props for the `SidebarState` class.
 * @returns  The `SidebarState` instance.
 */
export function setSidebar(props: SidebarStateProps): SidebarState {
	return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}

/**
 * Retrieves the `SidebarState` instance from the context, meaning it must be called
 * during the component lifecycle, and cannot be called programatically after the
 * component has been mounted.
 *
 * This is a class instance, so you cannot destructure it.
 *
 * The component calling this function must be a descendant of the `Sidebar.Provider` component.
 *
 * @example
 * ```svelte
 * <Sidebar.Provider>
 * <!--
 *  I can call useSidebar() in this component, because it's a descendant of Sidebar.Provider
 * -->
 * 	<SomeComponent />
 * </Sidebar.Provider>
 *
 * <!--
 * I cannot call useSidebar() in this component, because it's not a descendant of Sidebar.Provider
 * -->
 * <SomeComponent />
 * ```
 *
 * @returns The `SidebarState` instance.
 */
export function useSidebar(): SidebarState {
	if (!hasContext(Symbol.for(SYMBOL_KEY))) {
		throw new Error("useSidebar() must be called within a Sidebar.Provider component");
	}

	return getContext(Symbol.for(SYMBOL_KEY));
}
