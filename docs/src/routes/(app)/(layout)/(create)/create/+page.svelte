<script lang="ts">
	import { page } from "$app/state";
	import Preview from "../components/preview.svelte";

	const item = $derived(page.url.searchParams.get("item") ?? "preview-02");
</script>

<Preview {item} />
