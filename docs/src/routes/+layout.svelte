<script lang="ts">
	import Metadata from "$lib/components/metadata.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<Metadata />

{@render children()}
