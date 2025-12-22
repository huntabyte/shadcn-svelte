<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Carousel from "$lib/registry/ui/carousel/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Example title="With Gap">
	<Carousel.Root class="mx-auto max-w-xs sm:max-w-sm">
		<Carousel.Content class="-ml-1">
			{#each Array(5) as _, index (index)}
				<Carousel.Item class="pl-1 md:basis-1/2">
					<div class="p-1">
						<Card.Root>
							<Card.Content class="flex aspect-square items-center justify-center p-6">
								<span class="text-2xl font-semibold">{index + 1}</span>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="hidden sm:inline-flex" />
		<Carousel.Next class="hidden sm:inline-flex" />
	</Carousel.Root>
</Example>

