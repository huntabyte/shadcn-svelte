import type { WithElementRef } from "$lib/utils.js";
import type {
	EmblaCarouselSvelteType,
	default as emblaCarouselSvelte,
} from "embla-carousel-svelte";
import { createContext } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type CarouselAPI =
	NonNullable<NonNullable<EmblaCarouselSvelteType["$$_attributes"]>["on:emblaInit"]> extends (
		evt: CustomEvent<infer CarouselAPI>
	) => void
		? CarouselAPI
		: never;

type EmblaCarouselConfig = NonNullable<Parameters<typeof emblaCarouselSvelte>[1]>;

export type CarouselOptions = EmblaCarouselConfig["options"];
export type CarouselPlugins = EmblaCarouselConfig["plugins"];

////

export type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugins;
	setApi?: (api: CarouselAPI | undefined) => void;
	orientation?: "horizontal" | "vertical";
} & WithElementRef<HTMLAttributes<HTMLDivElement>>;

export type EmblaContext = {
	api: CarouselAPI | undefined;
	orientation: "horizontal" | "vertical";
	scrollNext: () => void;
	scrollPrev: () => void;
	canScrollNext: boolean;
	canScrollPrev: boolean;
	handleKeyDown: (e: KeyboardEvent) => void;
	options: CarouselOptions;
	plugins: CarouselPlugins;
	onInit: (e: CustomEvent<CarouselAPI>) => void;
	scrollTo: (index: number, jump?: boolean) => void;
	scrollSnaps: number[];
	selectedIndex: number;
};

const [getEmblaContextRaw, setEmblaContext] = createContext<EmblaContext>();
export { setEmblaContext };

export function getEmblaContext(name = "This component") {
	const ctx = getEmblaContextRaw();
	if (!ctx) {
		throw new Error(`${name} must be used within a <Carousel.Root> component`);
	}
	return ctx;
}
