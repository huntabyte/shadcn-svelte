<script lang="ts">
	import { Stage } from "svelte-stage";
	import { Badge } from "$ui/badge";
	import StageBox from "./StageBox.svelte";
</script>

<Stage component="Button">
	<StageBox>
		<Badge>Hello</Badge>
	</StageBox>
</Stage>
