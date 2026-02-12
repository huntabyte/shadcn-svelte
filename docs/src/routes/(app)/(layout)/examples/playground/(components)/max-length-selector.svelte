<script lang="ts">
	import type { Slider as SliderPrimitive } from "bits-ui";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	let { value = $bindable(), ...restProps }: SliderPrimitive.RootProps = $props();
</script>

<div class="grid gap-2 pt-2">
	<HoverCard.Root openDelay={200} closeDelay={100}>
		<HoverCard.Trigger>
			{#snippet child({ props })}
				<div class="grid gap-4" {...props}>
					<div class="flex items-center justify-between">
						<Label for="maxlength">Maximum Length</Label>
						<span
							class="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-end text-sm"
						>
							{value}
						</span>
					</div>
					<Slider
						id="maxlength"
						max={4000}
						bind:value={value as never}
						step={10}
						class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
						aria-label="Maximum Length"
						{...restProps}
					/>
				</div>
			{/snippet}
		</HoverCard.Trigger>
		<HoverCard.Content class="w-[260px] text-sm" side="left" align="start">
			The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens,
			shared between prompt and completion. The exact limit varies by model.
		</HoverCard.Content>
	</HoverCard.Root>
</div>
