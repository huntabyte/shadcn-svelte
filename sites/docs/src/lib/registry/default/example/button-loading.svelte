<script lang="ts">
	import LoaderCircle from "lucide-svelte/icons/loader-circle";
	import { Button } from "$lib/registry/default/ui/button/index.js";
</script>

<Button disabled>
	<LoaderCircle class="mr-2 size-4 animate-spin" />
	Please wait
</Button>
