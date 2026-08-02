<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Basic">
	<Field.Field orientation="horizontal">
		<Switch id="switch-basic" />
		<Field.Label for="switch-basic">Airplane Mode</Field.Label>
	</Field.Field>
</Example>
