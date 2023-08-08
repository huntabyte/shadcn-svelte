<script lang="ts">
	import { Italic } from "lucide-svelte";
	import { Toggle } from "@/registry/default/ui/toggle";
</script>

<Toggle aria-label="Toggle italic">
	<Italic class="mr-2 h-4 w-4" />
	Italic
</Toggle>
