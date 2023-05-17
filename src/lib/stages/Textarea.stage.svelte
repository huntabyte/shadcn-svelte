<script lang="ts">
	import { Stage } from "svelte-stage";
	import StageBox from "./StageBox.svelte";
	import { Textarea } from "$ui/textarea";
</script>

<Stage component="Textarea">
	<StageBox>
		<Textarea placeholder="Hello" />
	</StageBox>
</Stage>
