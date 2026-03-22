<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center space-x-2">
		<Switch id="switch-sm" size="sm" />
		<Label for="switch-sm">Small</Label>
	</div>
	<div class="flex items-center space-x-2">
		<Switch id="switch-default" />
		<Label for="switch-default">Default</Label>
	</div>
</div>
