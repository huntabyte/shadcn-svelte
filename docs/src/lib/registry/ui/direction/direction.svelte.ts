import { getContext } from "svelte";

export type Direction = "ltr" | "rtl";

export interface DirectionContext {
	direction: () => Direction;
}

export const DIRECTION_CONTEXT = Symbol("shadcn-svelte.direction");

export function useDirection(): Direction {
	return getContext<DirectionContext>(DIRECTION_CONTEXT).direction();
}
