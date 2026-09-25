<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";
</script>

<div class="w-full max-w-sm">
	<div class="mb-2 flex">
		<label class="text-sm font-medium" for="progress-upload">
			<span>Upload progress</span>
		</label>
		<span class="ml-auto text-sm font-medium">66%</span>
	</div>
	<Progress value={66} id="progress-upload" />
</div>
