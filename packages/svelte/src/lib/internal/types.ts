// oxlint-disable no-explicit-any
import type { Snippet } from "svelte";
import type { attachRef, Box, ReadableBoxedValues, WritableBoxedValues } from "svelte-toolbelt";

export type OnChangeFn<T> = (value: T) => void;

export type ElementRef = Box<HTMLElement | null>;

export type StyleProperties = Record<string, string | number | undefined> & {
	[str: `--${string}`]: string | number | undefined;
};

export type WithChild<
	Props extends Record<PropertyKey, unknown> = {},
	SnippetProps extends Record<PropertyKey, unknown> = { _default: never },
	Ref = HTMLElement,
> = Omit<Props, "child" | "children"> & {
	child?: SnippetProps extends { _default: never }
		? Snippet<[{ props: Record<string, unknown> }]>
		: Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
	children?: SnippetProps extends { _default: never } ? Snippet : Snippet<[SnippetProps]>;
	style?: StyleProperties | string | null | undefined;
	ref?: Ref | null | undefined;
};

export type WithChildNoChildrenSnippetProps<
	Props extends Record<PropertyKey, unknown> = {},
	SnippetProps extends Record<PropertyKey, unknown> = { _default: never },
	Ref = HTMLElement,
> = Omit<Props, "child" | "children"> & {
	child?: SnippetProps extends { _default: never }
		? Snippet<[{ props: Record<string, unknown> }]>
		: Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
	children?: Snippet;
	style?: StyleProperties | string | null | undefined;
	ref?: Ref | null | undefined;
};

export type Without<T extends object, U extends object> = Omit<T, keyof U>;

export type WithRefOpts<T = {}, Ref extends HTMLElement = HTMLElement> = T &
	ReadableBoxedValues<{ id: string }> &
	WritableBoxedValues<{ ref: Ref | null }>;

export type BitsEvent<T extends Event = Event, U extends HTMLElement = HTMLElement> = T & {
	currentTarget: U;
};

export type BitsKeyboardEvent<T extends HTMLElement = HTMLElement> = BitsEvent<KeyboardEvent, T>;
export type BitsMouseEvent<T extends HTMLElement = HTMLElement> = BitsEvent<MouseEvent, T>;

export type RefAttachment<T extends HTMLElement = HTMLElement> = ReturnType<typeof attachRef<T>>;
