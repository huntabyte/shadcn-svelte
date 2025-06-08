<script lang="ts">
	import PMExecute from "./pm-execute.svelte";
	export let name: string;
</script>

<PMExecute command={`shadcn-svelte@0.14.3 add ${name}`} />
