<script lang="ts">
	import PMBlock from "./pm-block.svelte";
	let { command }: { command: string } = $props();
</script>

<PMBlock type="execute" {command} />
