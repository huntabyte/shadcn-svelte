<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<RadioGroup.Root value="startup" class="grid max-w-md grid-cols-1 gap-2">
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="free" id="free" class="mt-1" />
		<div class="grid gap-0.5">
			<Label for="free" class="font-medium">Free plan</Label>
			<p class="text-muted-foreground text-sm">
				Perfect for hobby projects and side experiments.
			</p>
		</div>
	</div>
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="startup" id="startup" class="mt-1" />
		<div class="grid gap-0.5">
			<Label for="startup" class="font-medium">Startup plan</Label>
			<p class="text-muted-foreground text-sm">For growing teams that need more power.</p>
		</div>
	</div>
	<div class="flex items-start space-x-2">
		<RadioGroup.Item value="enterprise" id="enterprise" class="mt-1" />
		<div class="grid gap-0.5">
			<Label for="enterprise" class="font-medium">Enterprise plan</Label>
			<p class="text-muted-foreground text-sm">
				Dedicated support for large-scale applications.
			</p>
		</div>
	</div>
</RadioGroup.Root>
