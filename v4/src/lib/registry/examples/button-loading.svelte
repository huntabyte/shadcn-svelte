<script lang="ts">
	import Loader2Icon from "@lucide/svelte/icons/loader-2";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button disabled>
	<Loader2Icon class="animate-spin" />
	Please wait
</Button>
