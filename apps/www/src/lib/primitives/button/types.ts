import type { Builder } from "$primitives/internal";
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes
} from "svelte/elements";

type Builders = {
	builders: Builder[];
};

interface AnchorElement extends Builders, HTMLAnchorAttributes {
	href?: HTMLAnchorAttributes["href"];
	type?: never;
}

interface ButtonElement extends Builders, HTMLButtonAttributes {
	type?: HTMLButtonAttributes["type"];
	href?: never;
}

type Props = AnchorElement | ButtonElement;

export type { Props, Props as ButtonProps };
