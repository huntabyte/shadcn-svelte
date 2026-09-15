import type {
	HTMLAttributes,
	HTMLButtonAttributes,
	HTMLFieldsetAttributes,
	HTMLFormAttributes,
	HTMLInputAttributes,
	HTMLLabelAttributes,
	HTMLLegendAttributes,
} from "svelte/elements";

type Primitive<T> = Omit<T, "style" | "id" | "children"> & { id?: string };

export type PrimitiveButtonAttributes = Primitive<HTMLButtonAttributes>;
export type PrimitiveDivAttributes = Primitive<HTMLAttributes<HTMLDivElement>>;
export type PrimitiveInputAttributes = Primitive<HTMLInputAttributes>;
export type PrimitiveSpanAttributes = Primitive<HTMLAttributes<HTMLSpanElement>>;
export type PrimitiveFormAttributes = Primitive<HTMLFormAttributes>;
export type PrimitiveFieldsetAttributes = Primitive<HTMLFieldsetAttributes>;
export type PrimitiveLegendAttributes = Primitive<HTMLLegendAttributes>;
export type PrimitiveParagraphAttributes = Primitive<HTMLAttributes<HTMLParagraphElement>>;
export type PrimitiveLabelAttributes = Primitive<HTMLLabelAttributes>;
