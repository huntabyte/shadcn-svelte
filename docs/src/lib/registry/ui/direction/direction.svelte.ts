import { getContext, setContext } from "svelte";

export type Direction = "ltr" | "rtl";

type DirectionContext = {
	readonly current: Direction;
};

const DIRECTION_CONTEXT = Symbol("direction");
const fallback: DirectionContext = {
	current: "ltr",
};

export function setDirectionContext(direction: () => Direction) {
	return setContext<DirectionContext>(DIRECTION_CONTEXT, {
		get current() {
			return direction();
		},
	});
}

export function useDirection() {
	return useDirectionContext().current;
}

export function useDirectionContext() {
	return getContext<DirectionContext>(DIRECTION_CONTEXT) ?? fallback;
}
