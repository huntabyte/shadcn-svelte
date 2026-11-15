<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<Field.Field class="w-full max-w-sm">
	<Field.Label for="progress-upload" class="w-full">
		<span>Upload progress</span>
		<span class="ml-auto font-normal text-muted-foreground tabular-nums">56%</span>
	</Field.Label>
	<Progress value={56} id="progress-upload" />
</Field.Field>
