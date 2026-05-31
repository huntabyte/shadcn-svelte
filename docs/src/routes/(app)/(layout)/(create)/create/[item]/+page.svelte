<script lang="ts">
	import Preview from "../../components/preview.svelte";

	let { data } = $props();
</script>

<Preview item={data.params.item} />
