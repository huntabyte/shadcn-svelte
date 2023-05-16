<script lang="ts">
	import { Stage } from "svelte-stage";
	import { Button } from "$components/ui";
	import StageBox from "./StageBox.svelte";
</script>

<Stage component="Button">
	<StageBox>
		<Button>Hello</Button>
	</StageBox>
</Stage>
