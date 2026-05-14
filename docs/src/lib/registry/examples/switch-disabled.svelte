<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Field.Field orientation="horizontal" data-disabled class="w-fit">
	<Switch id="switch-disabled-unchecked" disabled />
	<Field.Label for="switch-disabled-unchecked">Disabled</Field.Label>
</Field.Field>
