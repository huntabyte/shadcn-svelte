<script lang="ts">
	import { Stage } from "svelte-stage";
	import StageBox from "./StageBox.svelte";
	import { Progress } from "$ui/progress";
</script>

<Stage component="Progress">
	<StageBox>
		<Progress value={40} max={60} />
	</StageBox>
</Stage>
