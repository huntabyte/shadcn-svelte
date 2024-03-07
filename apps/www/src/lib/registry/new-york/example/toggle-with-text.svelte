<script lang="ts">
	import FontItalic from "svelte-radix/FontItalic.svelte";
	import { Toggle } from "$lib/registry/new-york/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle italic">
	<FontItalic class="mr-2 h-4 w-4" />
	Italic
</Toggle>
