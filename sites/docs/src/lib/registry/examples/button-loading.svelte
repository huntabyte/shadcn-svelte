<script lang="ts">
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button disabled>
	<LoaderCircleIcon class="animate-spin" />
	Please wait
</Button>
