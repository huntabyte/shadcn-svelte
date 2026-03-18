<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Example title="With Description">
	<Field.Label for="switch-focus-mode">
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Title>Share across devices</Field.Title>
				<Field.Description>
					Focus is shared across devices, and turns off when you leave the app.
				</Field.Description>
			</Field.Content>
			<Switch id="switch-focus-mode" />
		</Field.Field>
	</Field.Label>
</Example>
