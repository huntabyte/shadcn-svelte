<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";

	let value = $state(60);
</script>

<div class="flex w-[60%] flex-col gap-2">
	<div class="flex justify-between text-sm">
		<span class="text-muted-foreground">Progress</span>
		<span class="font-medium">{value}%</span>
	</div>
	<Progress {value} max={100} />
</div>
