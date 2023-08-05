import type { HTMLDivAttributes } from "$primitives/internal";

type Props = {
	ratio: number;
} & HTMLDivAttributes;

export type {
	Props,
	//
	Props as AspectRatioProps
};
