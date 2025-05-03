<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress";

	let progress = $state(13);

	$effect(() => {
		const timer = setTimeout(() => 66, 500);
		return () => clearTimeout(timer);
	});
</script>

<Progress value={progress} class="w-[60%]" />
