import type { Action } from "svelte/action";
import type { HTMLAttributes } from "svelte/elements";
import type { TransitionConfig } from "svelte/transition";

export type ObjectVariation<T> = T extends object ? T : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transition = (node: Element, params?: any) => TransitionConfig;
export type TransitionParams<T extends Transition> = Parameters<T>[1];

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;
export type HTMLSpanAttributes = HTMLAttributes<HTMLSpanElement>;

export type OmitOpen<T> = Omit<T, "open" | "defaultOpen" | "onOpenChange">;
export type OmitValue<T> = Omit<T, "value" | "defaultValue" | "onValueChange">;
export type OmitChecked<T> = Omit<
	T,
	"checked" | "defaultChecked" | "onCheckedChange"
>;
export type OmitPressed<T> = Omit<
	T,
	"pressed" | "defaultPressed" | "onPressedChange"
>;
export type OmitForceVisible<T> = Omit<T, "forceVisible">;

export type Expand<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: O[K] }
		: never
	: T;

export type ExpandDeep<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandDeep<O[K]> }
		: never
	: T;

export type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Builder = {
	[x: PropertyKey]: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: Action<HTMLElement, any, any>;
};
