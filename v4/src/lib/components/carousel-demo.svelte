<script lang="ts">
	import * as Carousel from "$lib/registry/ui/carousel/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<div class="@4xl:flex hidden w-full flex-col items-center gap-4">
	<Carousel.Root
		class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
	>
		<Carousel.Content>
			{#each { length: 5 } as _, index (index)}
				<Carousel.Item>
					<div class="p-1">
						<Card.Root>
							<Card.Content
								class="flex aspect-square items-center justify-center p-6"
							>
								<span class="text-4xl font-semibold">{index + 1}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
	<Carousel.Root
		class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
		opts={{
			align: "start",
		}}
	>
		<Carousel.Content>
			{#each { length: 5 } as _, index (index)}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<div class="p-1">
						<Card.Root>
							<Card.Content
								class="flex aspect-square items-center justify-center p-6"
							>
								<span class="text-3xl font-semibold">{index + 1}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
	<Carousel.Root
		class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
	>
		<Carousel.Content class="-ml-1">
			{#each { length: 5 } as _, index (index)}
				<Carousel.Item class="pl-1 md:basis-1/2">
					<div class="p-1">
						<Card.Root>
							<Card.Content
								class="flex aspect-square items-center justify-center p-6"
							>
								<span class="text-2xl font-semibold">{index + 1}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
