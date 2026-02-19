<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable" disabled>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="default" id="rd1" />
		<Label for="rd1">Default</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="comfortable" id="rd2" />
		<Label for="rd2">Comfortable</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="compact" id="rd3" />
		<Label for="rd3">Compact</Label>
	</div>
</RadioGroup.Root>
