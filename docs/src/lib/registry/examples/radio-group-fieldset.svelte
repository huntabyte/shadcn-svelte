<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<fieldset class="space-y-3">
	<legend class="text-sm font-medium">Notification preference</legend>
	<RadioGroup.Root value="email">
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="email" id="rf-email" />
			<Label for="rf-email">Email notifications</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="sms" id="rf-sms" />
			<Label for="rf-sms">SMS notifications</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="push" id="rf-push" />
			<Label for="rf-push">Push notifications</Label>
		</div>
	</RadioGroup.Root>
</fieldset>
