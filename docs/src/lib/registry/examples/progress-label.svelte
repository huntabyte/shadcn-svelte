<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<Field.Field class="w-full max-w-sm">
	<Field.Label for="progress-upload">
		<span>Upload progress</span>
		<span class="ml-auto">66%</span>
	</Field.Label>
	<Progress value={66} id="progress-upload" />
</Field.Field>
