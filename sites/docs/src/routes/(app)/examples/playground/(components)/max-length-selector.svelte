<script lang="ts">
	import type { Slider as SliderPrimitive } from "bits-ui";
	import * as HoverCard from "$lib/registry/new-york/ui/hover-card/index.js";
	import { Slider } from "$lib/registry/new-york/ui/slider/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";

	export let value: SliderPrimitive.Props["value"];
</script>

<div class="grid gap-2 pt-2">
	<HoverCard.Root openDelay={200} closeDelay={100}>
		<HoverCard.Trigger asChild let:builder>
			<div class="grid gap-4" {...builder} use:builder.action>
				<div class="flex items-center justify-between">
					<Label for="maxlength">Maximum Length</Label>
					<span
						class="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm"
					>
						{value}
					</span>
				</div>
				<Slider
					id="maxlength"
					max={4000}
					bind:value
					step={10}
					class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
					aria-label="Maximum Length"
				/>
			</div>
		</HoverCard.Trigger>
		<HoverCard.Content class="w-[260px] text-sm" side="left" align="start">
			The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens,
			shared between prompt and completion. The exact limit varies by model.
		</HoverCard.Content>
	</HoverCard.Root>
</div>
