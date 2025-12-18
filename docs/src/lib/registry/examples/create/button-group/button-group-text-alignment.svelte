<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Example title="Text Alignment">
	<Field.Field>
		<Label id="alignment-label">Text Alignment</Label>
		<ButtonGroup aria-labelledby="alignment-label">
			<Button variant="outline" size="sm">Left</Button>
			<Button variant="outline" size="sm">Center</Button>
			<Button variant="outline" size="sm">Right</Button>
			<Button variant="outline" size="sm">Justify</Button>
		</ButtonGroup>
	</Field.Field>
</Example>
