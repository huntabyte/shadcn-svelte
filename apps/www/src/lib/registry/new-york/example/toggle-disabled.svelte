<script lang="ts">
	import Underline from "svelte-radix/Underline.svelte";
	import { Toggle } from "$lib/registry/new-york/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle underline" disabled>
	<Underline class="h-4 w-4" />
</Toggle>
