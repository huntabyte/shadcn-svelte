<script lang="ts">
	import PMExecute from "./pm-execute.svelte";

	let { name }: { name: string } = $props();
</script>

<PMExecute command={`shadcn-svelte@latest add ${name}`} />
