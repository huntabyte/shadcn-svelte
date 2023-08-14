<script lang="ts">
	import {
		Popover,
		PopoverTrigger,
		PopoverContent
	} from "@/registry/default/ui/popover";
	import { Label } from "@/registry/default/ui/label";
	import { Button } from "@/registry/default/ui/button";
	import { Input } from "@/registry/default/ui/input";
</script>

<Popover>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Open</Button>
	</PopoverTrigger>
	<PopoverContent class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Dimensions</h4>
				<p class="text-sm text-muted-foreground">
					Set the dimensions for the layer.
				</p>
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
	</PopoverContent>
</Popover>
