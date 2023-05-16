<script lang="ts">
	import { Terminal } from "lucide-svelte";
	import { Stage } from "svelte-stage";
	import AlertDialogOverlay from "$components/ui/AlertDialog/AlertDialogOverlay.svelte";
	import StageBox from "./StageBox.svelte";
</script>

<Stage component="Alert">
	<StageBox />
</Stage>
