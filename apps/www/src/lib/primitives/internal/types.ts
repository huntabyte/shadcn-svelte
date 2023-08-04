import type { TransitionConfig } from "svelte/transition";

export type ObjectVariation<T> = T extends object ? T : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transition = (node: Element, params?: any) => TransitionConfig;
export type TransitionParams<T extends Transition> = Parameters<T>[1];
