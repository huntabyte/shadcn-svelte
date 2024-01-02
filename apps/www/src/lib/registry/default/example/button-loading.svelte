<script lang="ts">
	import Loader2 from "lucide-svelte/icons/loader-2";
	import { Button } from "@/registry/default/ui/button";
</script>

<Button disabled>
	<Loader2 class="mr-2 h-4 w-4 animate-spin" />
	Please wait
</Button>
