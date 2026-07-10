<script lang="ts">
	import Preview from "../../components/preview.svelte";
	import CtaMobile from "$lib/components/cta-mobile.svelte";

	let { data } = $props();
</script>

<div class="flex min-h-0 min-w-0 flex-1 flex-col gap-(--gap)">
	<div class="relative z-20 w-full">
		<CtaMobile showOnDesktop />
	</div>
	<Preview item={data.params.item} />
</div>
