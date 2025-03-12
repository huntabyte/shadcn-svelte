<script lang="ts">
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
</script>

<Button disabled>
	<LoaderCircle class="animate-spin" />
	Please wait
</Button>
