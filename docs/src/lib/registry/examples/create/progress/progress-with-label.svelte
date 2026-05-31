<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<Example title="With Label">
	<Field.Field>
		<Field.Label for="progress-upload">
			<span>Upload progress</span>
			<span class="ml-auto">66%</span>
		</Field.Label>
		<Progress value={66} class="w-full" id="progress-upload" />
	</Field.Field>
</Example>
