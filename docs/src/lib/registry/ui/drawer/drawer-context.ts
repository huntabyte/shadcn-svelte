import { getContext, setContext } from "svelte";

const DRAWER_CONTEXT = Symbol("drawer");

type DrawerContext = {
	readonly showSwipeHandle: boolean;
	readonly direction: "top" | "right" | "bottom" | "left";
};

export function setDrawerContext(context: DrawerContext) {
	setContext(DRAWER_CONTEXT, context);
}

export function getDrawerContext() {
	return getContext<DrawerContext | undefined>(DRAWER_CONTEXT);
}
