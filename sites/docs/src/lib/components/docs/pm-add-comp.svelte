<script lang="ts">
	import PMExecute from "./pm-execute.svelte";
	export let name: string;
</script>

<PMExecute command={`shadcn-svelte@latest add ${name}`} />
