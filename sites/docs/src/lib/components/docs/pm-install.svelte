<script lang="ts">
	import PMBlock from "./pm-block.svelte";
	export let command: string = "";
</script>

<PMBlock type="install" {command} />
