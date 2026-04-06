<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<RadioGroup.Root value="option2" class="w-fit">
	<div class="flex items-center space-x-2" data-disabled>
		<RadioGroup.Item value="option1" id="disabled-1" disabled />
		<Label for="disabled-1" class="font-normal">Disabled</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="option2" id="disabled-2" />
		<Label for="disabled-2" class="font-normal">Option 2</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="option3" id="disabled-3" />
		<Label for="disabled-3" class="font-normal">Option 3</Label>
	</div>
</RadioGroup.Root>
