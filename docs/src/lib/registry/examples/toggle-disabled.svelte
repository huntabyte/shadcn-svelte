<script lang="ts">
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
</script>

<div class="flex flex-wrap items-center gap-2">
	<Toggle aria-label="Toggle disabled" disabled>Disabled</Toggle>
	<Toggle variant="outline" aria-label="Toggle disabled outline" disabled>Disabled</Toggle>
</div>
