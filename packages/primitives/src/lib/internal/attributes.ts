import type {
	HTMLAttributes,
	HTMLButtonAttributes,
	HTMLFieldsetAttributes,
	HTMLFormAttributes,
	HTMLInputAttributes,
	HTMLLabelAttributes,
} from "svelte/elements";

// Utility type to strip keys containing colons from a type (used to remove Svelte 4 event directive keys `on:event`).
type StripColonKeys<T> = {
	[K in keyof T as K extends `${string}:${string}` ? never : K]: T[K];
};

type Primitive<T> = StripColonKeys<Omit<T, "style" | "id" | "children"> & { id?: string }>;

export type PrimitiveButtonAttributes = Primitive<HTMLButtonAttributes>;
export type PrimitiveDivAttributes = Primitive<HTMLAttributes<HTMLDivElement>>;
export type PrimitiveInputAttributes = Primitive<HTMLInputAttributes>;
export type PrimitiveSpanAttributes = Primitive<HTMLAttributes<HTMLSpanElement>>;
export type PrimitiveFormAttributes = Primitive<HTMLFormAttributes>;
export type PrimitiveFieldsetAttributes = Primitive<HTMLFieldsetAttributes>;
export type PrimitiveLegendAttributes = Primitive<HTMLAttributes<HTMLLegendElement>>;
export type PrimitiveParagraphAttributes = Primitive<HTMLAttributes<HTMLParagraphElement>>;
export type PrimitiveLabelAttributes = Primitive<HTMLLabelAttributes>;
