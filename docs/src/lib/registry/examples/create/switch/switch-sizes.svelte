<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Example title="Sizes">
	<div class="flex flex-col gap-12">
		<div class="flex items-center gap-2">
			<Switch id="switch-size-sm" size="sm" />
			<Label for="switch-size-sm">Small</Label>
		</div>
		<div class="flex items-center gap-2">
			<Switch id="switch-size-default" size="default" />
			<Label for="switch-size-default">Default</Label>
		</div>
	</div>
</Example>
