<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import LoaderCircle from "lucide-svelte/icons/loader-circle";
</script>

<Button disabled>
	<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
	Please wait
</Button>
