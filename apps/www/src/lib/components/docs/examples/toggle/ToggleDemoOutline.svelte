<script lang="ts">
	import { Italic } from "lucide-svelte";
	import { Toggle } from "$components/ui/toggle";
</script>

<Toggle variant="outline" aria-label="Toggle italic">
	<Italic class="h-4 w-4" />
</Toggle>
