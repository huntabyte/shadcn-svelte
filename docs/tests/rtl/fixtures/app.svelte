<script lang="ts">
	import { BitsConfig } from "bits-ui";
	import * as Carousel from "$lib/registry/ui/carousel/index.js";
	import Demo from "$lib/registry/examples/direction-demo.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import Probe from "./probe.svelte";
	let direction = $state<"ltr" | "rtl">("rtl");
	let override = $state<"ltr" | "rtl" | undefined>("ltr");
</script>

<main class="mx-auto flex max-w-3xl flex-col gap-8">
	<Probe id="fallback" />
	<button onclick={() => (direction = direction === "rtl" ? "ltr" : "rtl")}>Toggle provider</button>
	<button onclick={() => (override = undefined)}>Inherit direction</button>
	<div id="portal-target"></div>
	<BitsConfig defaultLocale="ar" defaultPortalTo="#portal-target">
		<DirectionProvider dir="ltr" {direction}>
			<Probe id="outer" />
			<DirectionProvider><Probe id="inherited" /></DirectionProvider>
			<DirectionProvider dir={override}><Probe id="override" /></DirectionProvider>
			<div dir={direction}>
				<Slider type="single" value={50} aria-label="Provider volume" />
				<Slider type="single" dir="ltr" value={50} aria-label="Override volume" />
				<Carousel.Root class="mx-16 w-48">
					<Carousel.Content>
						{#each [1, 2, 3] as slide (slide)}
							<Carousel.Item
								><div class="flex h-32 items-center justify-center rounded border">
									Slide {slide}
								</div></Carousel.Item
							>
						{/each}
					</Carousel.Content>
					<Carousel.Previous /><Carousel.Next />
				</Carousel.Root>
			</div>
		</DirectionProvider>
	</BitsConfig>
	<Demo />
	<div dir={direction} data-testid="calendar">
		<Calendar type="single" locale={direction === "rtl" ? "ar" : "en"} />
	</div>
</main>
