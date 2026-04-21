<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable" class="w-fit">
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="default" id="desc-r1" />
		<div>
			<Label for="desc-r1">Default</Label>
			<p class="text-muted-foreground text-sm">Standard spacing for most use cases.</p>
		</div>
	</div>
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="comfortable" id="desc-r2" />
		<div>
			<Label for="desc-r2">Comfortable</Label>
			<p class="text-muted-foreground text-sm">More space between elements.</p>
		</div>
	</div>
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="compact" id="desc-r3" />
		<div>
			<Label for="desc-r3">Compact</Label>
			<p class="text-muted-foreground text-sm">Minimal spacing for dense layouts.</p>
		</div>
	</div>
</RadioGroup.Root>
