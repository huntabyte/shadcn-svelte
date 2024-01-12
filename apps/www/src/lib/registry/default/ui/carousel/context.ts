import type { EmblaCarouselSvelteType } from "embla-carousel-svelte";
import type emblaCarouselSvelte from "embla-carousel-svelte";
import { getContext, hasContext, setContext } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { Writable, Readable } from "svelte/store";
import { readable } from "svelte/store";

export type EmblaCarouselType = NonNullable<
	NonNullable<EmblaCarouselSvelteType["$$_attributes"]>["on:emblaInit"]
> extends (evt: CustomEvent<infer EmblaCarouselType>) => void
	? EmblaCarouselType
	: never;

type EmblaCarouselConfig = NonNullable<Parameters<typeof emblaCarouselSvelte>[1]>;

export type EmblaCarouselOptions = EmblaCarouselConfig["options"];
export type EmblaCarouselPlugins = EmblaCarouselConfig["plugins"];

////

export type CarouselProps = {
	options?: EmblaCarouselOptions;
	plugins?: EmblaCarouselPlugins;
	api?: EmblaCarouselType;
	orientation?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLDivElement>;

const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");

type EmblaContext = {
	api: Writable<EmblaCarouselType | undefined>;
	orientation: Writable<"horizontal" | "vertical">;
	scrollNext: () => void;
	scrollPrev: () => void;
	canScrollNext: Readable<boolean>;
	canScrollPrev: Readable<boolean>;
	handleKeyDown: (e: KeyboardEvent) => void;
};

const defaults = {
	scrollNext: () => {},
	scrollPrev: () => {},
	canScrollNext: readable(false),
	canScrollPrev: readable(false)
};

export function setEmblaContex(config: EmblaContext): EmblaContext {
	const withDefaults = { ...defaults, ...config };

	setContext(EMBLA_CAROUSEL_CONTEXT, withDefaults);
	return withDefaults;
}

export function getEmblaContext(name = "This component") {
	if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
		throw new Error(`${name} must be used within a <Carousel.Root> component`);
	}

	return getContext<ReturnType<typeof setEmblaContex>>(EMBLA_CAROUSEL_CONTEXT);
}
