<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover";
	import { Button } from "$lib/registry/ui/button";
	import { Label } from "$lib/registry/ui/label";
	import { Input } from "$lib/registry/ui/input";
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Open popover</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-80" align="start">
		<div class="grid gap-4">
			<div class="grid gap-1.5">
				<h4 class="font-medium leading-none">Dimensions</h4>
				<p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
			</div>
			<div class="grid gap-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="width">Width</Label>
					<Input id="width" value="100%" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="maxWidth">Max. width</Label>
					<Input id="maxWidth" value="300px" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="height">Height</Label>
					<Input id="height" value="25px" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="maxHeight">Max. height</Label>
					<Input id="maxHeight" value="none" class="col-span-2 h-8" />
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
