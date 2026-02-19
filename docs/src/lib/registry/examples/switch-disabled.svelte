<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center space-x-2">
		<Switch id="sw-disabled-off" disabled />
		<Label for="sw-disabled-off">Disabled</Label>
	</div>
	<div class="flex items-center space-x-2">
		<Switch id="sw-disabled-on" disabled checked />
		<Label for="sw-disabled-on">Disabled (checked)</Label>
	</div>
</div>
