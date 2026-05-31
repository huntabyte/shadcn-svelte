<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Example title="Disabled">
	<div class="flex flex-col gap-12">
		<div class="flex items-center gap-2">
			<Switch id="switch-disabled-unchecked" disabled />
			<Label for="switch-disabled-unchecked">Disabled (Unchecked)</Label>
		</div>
		<div class="flex items-center gap-2">
			<Switch id="switch-disabled-checked" checked disabled />
			<Label for="switch-disabled-checked">Disabled (Checked)</Label>
		</div>
	</div>
</Example>
