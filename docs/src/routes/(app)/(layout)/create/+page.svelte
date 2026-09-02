<script lang="ts">
	import { page } from "$app/state";
	import Preview from "./components/preview.svelte";
	import { DEFAULT_ITEM } from "./lib/utils.js";

	const item = $derived(page.url.searchParams.get("item") ?? DEFAULT_ITEM);
</script>

<Preview {item} />
