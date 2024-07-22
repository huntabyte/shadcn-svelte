<script lang="ts">
	import Underline from "lucide-svelte/icons/underline";
	import { Toggle } from "$lib/registry/default/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle underline" disabled>
	<Underline class="h-4 w-4" />
</Toggle>
