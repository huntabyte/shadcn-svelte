<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="max-w-[10rem]">
	<Field.Group>
		<Field.Field orientation="horizontal">
			<Switch id="switch-sm" size="sm" />
			<Field.Label for="switch-sm">Small</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Switch id="switch-default" />
			<Field.Label for="switch-default">Default</Field.Label>
		</Field.Field>
	</Field.Group>
</div>
