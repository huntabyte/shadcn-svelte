<script lang="ts">
	import MoveRightIcon from "@lucide/svelte/icons/move-right";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const DEMOGRAPHIC_DATA = [
		{ age: "18 - 24", percentage: 22 },
		{ age: "25 - 34", percentage: 64 },
		{ age: "35 - 44", percentage: 12 },
		{ age: "45+", percentage: 5 },
	];
</script>

<Card.Root class={className} {...restProps}>
	<Card.Header>
		<Card.Title class="text-2xl">Demographics</Card.Title>
		<Card.Description>Reader Profile</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-10">
		{#each DEMOGRAPHIC_DATA as item (item.age)}
			<div class="flex flex-col gap-2">
				<div class="flex justify-between text-sm">
					<span>{item.age}</span>
					<span class="text-muted-foreground">{item.percentage}%</span>
				</div>
				<Progress value={item.percentage} aria-label={item.age} />
			</div>
		{/each}
	</Card.Content>
	<Card.Footer>
		<Button variant="link" class="w-full">
			View all source <MoveRightIcon data-icon="inline-end" />
		</Button>
	</Card.Footer>
</Card.Root>
