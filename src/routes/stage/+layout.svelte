<script lang="ts">
	import { StageLayout, type loadStageData } from "svelte-stage";

	export let data: ReturnType<typeof loadStageData>;
</script>

<StageLayout {data}>
	<slot />
</StageLayout>
