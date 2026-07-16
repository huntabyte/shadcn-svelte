<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button variant="outline" class="w-[200px] justify-between" disabled>
	Select a framework
	<ChevronsUpDownIcon class="opacity-50" />
</Button>
